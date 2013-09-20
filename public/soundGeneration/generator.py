# generate wav file containing sine waves
# FB36 - 20120617
import math, wave, array
duration = 0.5 # seconds
freq = 50.0 # of cycles per second (Hz) (frequency of the sine waves)
volume = 100.0 # percent
sampleRate = 41000.0 # of samples per second (standard)
numChan = 2 # of channels (1: mono, 2: stereo)
dataSize = 2 # 2 bytes because of using signed short integers => bit depth = 16
numSamplesPerCyc = int(sampleRate / freq)
for servoAngle in range(19):
	angle = servoAngle * 10;
	left = array.array('h') # signed short integer (-32768 to 32767) data
	right = array.array('h') # right side
	pulseWidth = 1 + angle / 45.0  # pulse width in milliseconds
	pulseSampleSize = int (pulseWidth*sampleRate / 1000.0)
	numSamples = int(sampleRate * duration)
	for i in range(numSamples):
	    sample = -32767
	    j = float(i % numSamplesPerCyc)
	    sample *= (j < pulseSampleSize ) * (math.sin((j/pulseSampleSize)*2*math.pi))
	    left.append(int(sample))
	    left.append(0)
	    right.append(0)
	    right.append(int(sample))
	f = wave.open('left_' + str(angle) + '.wav', 'w')
	f.setparams((numChan, dataSize, sampleRate, numSamples, "NONE", "Uncompressed"))
	f.writeframes(left.tostring())
	f.close()
	g = wave.open('right_' + str(angle) + '.wav', 'w')
	g.setparams((numChan, dataSize, sampleRate, numSamples, "NONE", "Uncompressed"))
	g.writeframes(right.tostring())
	g.close()
