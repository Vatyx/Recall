# Recall

The personal voice assistant that'll help the Alzheimer's patient in your life.

# Testing

to record
arecord -D plughw:1,0 -f S16_LE -r16000 test.wav

to play back
aplay -D plughw:1,0 test.wav

alsamixer 

echo “hello world” | festival --tts

timeout 5s arecord -D plughw:1,0 -f cd test.wav
