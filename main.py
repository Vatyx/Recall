# External module imports
import RPi.GPIO as GPIO
import os
import time
from houndify import StreamingHoundClient, HoundListener
import time
import json
import wave 
import sys

CLIENT_KEY = "6Sj8q6MjtXyNsD7y52F1wpO_CEFdofK6q5QJGMw2B-Nbtw_7-NXRMAPqXkonoDQGGaBLLTH3Qb4gOkpxEYoMzQ=="
CLIENT_ID = "zCp-zCaz3EDyaivN6iChzg=="
BUFFER_SIZE = 512
outputString = ""
gotAnswer = False

fileName = "output.wav"

class MyListener(HoundListener):
    def onPartialTranscript(self, transcript):
        print "Partial transcript: " + transcript
    def onFinalResponse(self, response):
        print "Getting JSON"
        f = open('response.json', 'w')
        string = response["AllResults"][0]["SpokenResponseLong"]
        global outputString
        outputString = string
        global gotAnswer
        gotAnswer = True

    def onTranslatedResponse(self, response):
        print "Translated response: " + response
    def onError(self, err):
        print "ERROR"

def getAnswer(fileName):
    client = StreamingHoundClient(CLIENT_KEY, CLIENT_ID)
    client.setLocation(37.388309, -121.973968)

    fname = fileName
    print "============== %s ===================" % fname
    audio = wave.open(fname)
    samples = audio.readframes(BUFFER_SIZE)
    finished = False
    client.start(MyListener())
    while not finished:
        finished = client.fill(samples)
        time.sleep(0.032)           ## simulate real-time so we can see the partial transcripts
        samples = audio.readframes(BUFFER_SIZE)
        if len(samples) == 0:
            break
    client.finish()

    global gotAnswer
    while not gotAnswer:
        pass
    gotAnswer = False
    return outputString
    
# Pin Definitons:
ledPin = 23 # Broadcom pin 23 (P1 pin 16)
red = 13
green = 19
blue = 26
butPin =27  # Broadcom pin 17 (P1 pin 11)

dc = 95 # duty cycle (0-100) for PWM pin

# Pin Setup:
GPIO.setmode(GPIO.BCM) # Broadcom pin-numbering scheme
GPIO.setup(ledPin, GPIO.OUT) # LED pin set as output
GPIO.setup(red, GPIO.OUT)
GPIO.setup(green, GPIO.OUT)
GPIO.setup(blue, GPIO.OUT)
GPIO.setup(butPin, GPIO.IN, pull_up_down=GPIO.PUD_UP) # Button pin set as input w/ pull-up

# Initial state for LEDs:
GPIO.output(green, GPIO.LOW)
GPIO.output(blue, GPIO.LOW)
GPIO.output(red, GPIO.LOW)
#GPIO.output(ledPin, GPIO.HIGH)
#GPIO.setup(butPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

print("Here we go! Press CTRL+C to exit")
try:
    while 1:
    	if not GPIO.input(butPin):
		GPIO.output(red, GPIO.LOW)
    		GPIO.output(green, GPIO.HIGH)
		os.system("timeout 5s arecord -D plughw:1,0 -f S16_LE -r 16000 output.wav")
		print "done with thing"
		GPIO.output(blue, GPIO.HIGH)
		response = getAnswer(fileName)
		print response
		os.system("echo \"" + response + "\" | festival --tts")
		print "Done talking to you fool"
    	else:
		GPIO.output(red, GPIO.HIGH)
    		GPIO.output(green, GPIO.LOW)
		GPIO.output(blue, GPIO.LOW)
    	#GPIO.output(ledPin, GPIO.HIGH)
    	#time.sleep(0.5)
    	GPIO.output(ledPin, GPIO.LOW)
    	#time.sleep(0.5)
except KeyboardInterrupt: # If CTRL+C is pressed, exit cleanly:
    GPIO.cleanup() # cleanup all GPIO
