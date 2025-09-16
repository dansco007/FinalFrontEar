// Consts & functions about Cards and Notes



const notes = [

    //__________ octave 1

    {
        name: "C", frName: "do", octave: 1, fullName: 'C1', noteNamesIndex: 0,
        midiCode: 24, pianoKey: 4, freq: 32.70
    },
    {
        name: "Dbb", frName: "ré double bémol", octave: 1, fullName: 'Dbb1', noteNamesIndex: 1,
        midiCode: 24, pianoKey: 4, freq: 32.70
    },
    {
        name: "B##", frName: "si double dièse", octave: 1, fullName: 'B##0', noteNamesIndex: 6,
        midiCode: 25, pianoKey: 5, freq: 34.65
    },
    {
        name: "C#", frName: "do dièse", octave: 1, fullName: 'C#1', noteNamesIndex: 0,
        midiCode: 25, pianoKey: 5, freq: 34.65
    },
    {
        name: "Db", frName: "ré bémol", octave: 1, fullName: 'Db1', noteNamesIndex: 1,
        midiCode: 25, pianoKey: 5, freq: 34.65
    },
    {
        name: "C##", frName: "do double dièse", octave: 1, fullName: 'C##1', noteNamesIndex: 0,
        midiCode: 26, pianoKey: 6, freq: 36.71
    },
    {
        name: "D", frName: "ré", octave: 1, fullName: 'D1', noteNamesIndex: 1,
        midiCode: 26, pianoKey: 6, freq: 36.71
    },
    {
        name: "Ebb", frName: "mi double bémol", octave: 1, fullName: 'Ebb1', noteNamesIndex: 2,
        midiCode: 26, pianoKey: 6, freq: 36.71
    },
    {
        name: "D#", frName: "ré dièse", octave: 1, fullName: 'D#1', noteNamesIndex: 1,
        midiCode: 27, pianoKey: 7, freq: 38.89
    },
    {
        name: "Eb", frName: "mi bémol", octave: 1, fullName: 'Eb1', noteNamesIndex: 2,
        midiCode: 27, pianoKey: 7, freq: 38.89
    },
    {
        name: "Fbb", frName: "Fa double bémol", octave: 1, fullName: 'Fbb1', noteNamesIndex: 3,
        midiCode: 27, pianoKey: 7, freq: 38.89
    },
    {
        name: "D##", frName: "ré double dièse", octave: 1, fullName: 'D##1', noteNamesIndex: 1,
        midiCode: 28, pianoKey: 8, freq: 41.20
    },
    {
        name: "E", frName: "mi", octave: 2, fullName: 'E1', noteNamesIndex: 2,
        midiCode: 28, pianoKey: 8, freq: 41.20
    },
    {
        name: "Fb", frName: "fa bémol", octave: 2, fullName: 'Fb1', noteNamesIndex: 3,
        midiCode: 28, pianoKey: 8, freq: 41.20
    },
    {
        name: "E#", frName: "mi dièse", octave: 1, fullName: 'E#1', noteNamesIndex: 2,
        midiCode: 29, pianoKey: 9, freq: 43.65
    },
    {
        name: "F", frName: "fa", octave: 1, fullName: 'F1', noteNamesIndex: 3,
        midiCode: 29, pianoKey: 9, freq: 43.65
    },
    {
        name: "Gbb", frName: "sol double bémol", octave: 1, fullName: 'Gbb1', noteNamesIndex: 4,
        midiCode: 29, pianoKey: 9, freq: 43.65
    },
    {
        name: "E##", frName: "mi double dièse", octave: 1, fullName: 'E##1', noteNamesIndex: 2,
        midiCode: 30, pianoKey: 10, freq: 46.25
    },
    {
        name: "F#", frName: "fa dièse", octave: 1, fullName: 'F#1', noteNamesIndex: 3,
        midiCode: 30, pianoKey: 10, freq: 46.25
    },
    {
        name: "Gb", frName: "sol bémol", octave: 1, fullName: 'Gb1', noteNamesIndex: 4,
        midiCode: 30, pianoKey: 10, freq: 46.25
    },
    {
        name: "F##", frName: "fa double dièse", octave: 1, fullName: 'F##1', noteNamesIndex: 3,
        midiCode: 31, pianoKey: 11, freq: 49.00
    },
    {
        name: "G", frName: "sol", octave: 1, fullName: 'G1', noteNamesIndex: 4,
        midiCode: 31, pianoKey: 11, freq: 49.00
    },
    {
        name: "Abb", frName: "la double bémol", octave: 1, fullName: 'Abb1', noteNamesIndex: 5,
        midiCode: 31, pianoKey: 11, freq: 49.00
    },
    {
        name: "G#", frName: "G dièse", octave: 1, fullName: 'G#1', noteNamesIndex: 4,
        midiCode: 32, pianoKey: 12, freq: 51.91
    },
    {
        name: "Ab", frName: "la bémol", octave: 1, fullName: 'Ab1', noteNamesIndex: 5,
        midiCode: 32, pianoKey: 12, freq: 51.91
    },
    {
        name: "Bbbb", frName: "si triple bémol", octave: 2, fullName: 'Bbbb2', noteNamesIndex: 6,
        midiCode: 32, pianoKey: 12, freq: 51.91
    },
    {
        name: "G##", frName: "sol", octave: 1, fullName: 'G##1', noteNamesIndex: 4,
        midiCode: 33, pianoKey: 13, freq: 55.00
    },
    {
        name: "A", frName: "la", octave: 1, fullName: 'A1', noteNamesIndex: 5,
        midiCode: 33, pianoKey: 13, freq: 55.00
    },
    {
        name: "Bbb", frName: "si double bémol", octave: 1, fullName: 'Bbb1', noteNamesIndex: 6,
        midiCode: 33, pianoKey: 13, freq: 55.00
    },
    {
        name: "Cbbb", frName: "do triple bémol", octave: 2, fullName: 'Cbbb2', noteNamesIndex: 0,
        midiCode: 33, pianoKey: 13, freq: 55.00
    },
    {
        name: "A#", frName: "la dièse", octave: 1, fullName: 'A#1', noteNamesIndex: 5,
        midiCode: 34, pianoKey: 14, freq: 58.27
    },
    {
        name: "Bb", frName: "si bémol", octave: 1, fullName: 'Bb1', noteNamesIndex: 6,
        midiCode: 34, pianoKey: 14, freq: 58.27
    },
    {
        name: "Cbb", frName: "do double bémol", octave: 2, fullName: 'Cbb2', noteNamesIndex: 0,
        midiCode: 34, pianoKey: 14, freq: 58.27
    },
    {
        name: "A##", frName: "la double dièse", octave: 1, fullName: 'A##1', noteNamesIndex: 5,
        midiCode: 35, pianoKey: 15, freq: 61.74
    },
    {
        name: "B", frName: "si", octave: 1, fullName: 'B1', noteNamesIndex: 6,
        midiCode: 35, pianoKey: 15, freq: 61.74
    },
    {
        name: "Cb", frName: "do bémol", octave: 2, fullName: 'Cb2', noteNamesIndex: 0,
        midiCode: 35, pianoKey: 15, freq: 61.74
    },
    {
        name: "B#", frName: "si dièse", octave: 1, fullName: 'B#1', noteNamesIndex: 6,
        midiCode: 36, pianoKey: 16, freq: 65.41
    },

    //__________ octave 2
    
    {
        name: "C", frName: "do", octave: 2, fullName: 'C2', noteNamesIndex: 0,
        midiCode: 36, pianoKey: 16, freq: 65.41
    },
    {
        name: "Dbb", frName: "ré double bémol", octave: 2, fullName: 'Dbb2', noteNamesIndex: 1,
        midiCode: 36, pianoKey: 16, freq: 65.41
    },
    {
        name: "B##", frName: "si double dièse", octave: 1, fullName: 'B##1', noteNamesIndex: 6,
        midiCode: 37, pianoKey: 17, freq: 69.30
    },
    {
        name: "C#", frName: "do dièse", octave: 2, fullName: 'C#2', noteNamesIndex: 0,
        midiCode: 37, pianoKey: 17, freq: 69.30
    },
    {
        name: "Db", frName: "ré bémol", octave: 2, fullName: 'Db2', noteNamesIndex: 1,
        midiCode: 37, pianoKey: 17, freq: 69.30
    },
    {
        name: "C##", frName: "do double dièse", octave: 2, fullName: 'C##2', noteNamesIndex: 0,
        midiCode: 38, pianoKey: 18, freq: 73.42
    },
    {
        name: "D", frName: "ré", octave: 2, fullName: 'D2', noteNamesIndex: 1,
        midiCode: 38, pianoKey: 18, freq: 73.42
    },
    {
        name: "Ebb", frName: "mi double bémol", octave: 2, fullName: 'Ebb2', noteNamesIndex: 2,
        midiCode: 38, pianoKey: 18, freq: 73.42
    },
    {
        name: "D#", frName: "ré dièse", octave: 2, fullName: 'D#2', noteNamesIndex: 1,
        midiCode: 39, pianoKey: 19, freq: 77.78
    },
    {
        name: "Eb", frName: "mi bémol", octave: 2, fullName: 'Eb2', noteNamesIndex: 2,
        midiCode: 39, pianoKey: 19, freq: 77.78
    },
    {
        name: "Fbb", frName: "Fa double bémol", octave: 2, fullName: 'Fbb2', noteNamesIndex: 3,
        midiCode: 39, pianoKey: 19, freq: 77.78
    },
    {
        name: "D##", frName: "ré double dièse", octave: 2, fullName: 'D##2', noteNamesIndex: 1,
        midiCode: 40, pianoKey: 20, freq: 82.41
    },
    {
        name: "E", frName: "mi", octave: 2, fullName: 'E2', noteNamesIndex: 2,
        midiCode: 40, pianoKey: 20, freq: 82.41
    },
    {
        name: "Fb", frName: "fa bémol", octave: 2, fullName: 'Fb2', noteNamesIndex: 3,
        midiCode: 40, pianoKey: 20, freq: 82.41
    },
    {
        name: "E#", frName: "mi dièse", octave: 2, fullName: 'E#2', noteNamesIndex: 2,
        midiCode: 41, pianoKey: 21, freq: 87.31
    },
    {
        name: "F", frName: "fa", octave: 2, fullName: 'F2', noteNamesIndex: 3,
        midiCode: 41, pianoKey: 21, freq: 87.31
    },
    {
        name: "Gbb", frName: "sol double bémol", octave: 2, fullName: 'Gbb2', noteNamesIndex: 4,
        midiCode: 41, pianoKey: 21, freq: 87.31
    },
    {
        name: "E##", frName: "mi double dièse", octave: 2, fullName: 'E##2', noteNamesIndex: 2,
        midiCode: 42, pianoKey: 22, freq: 92.50
    },
    {
        name: "F#", frName: "fa dièse", octave: 2, fullName: 'F#2', noteNamesIndex: 3,
        midiCode: 42, pianoKey: 22, freq: 92.50
    },
    {
        name: "Gb", frName: "sol bémol", octave: 2, fullName: 'Gb2', noteNamesIndex: 4,
        midiCode: 42, pianoKey: 22, freq: 92.50
    },
    {
        name: "F##", frName: "fa double dièse", octave: 2, fullName: 'F##2', noteNamesIndex: 3,
        midiCode: 43, pianoKey: 23, freq: 98.00
    },
    {
        name: "G", frName: "sol", octave: 2, fullName: 'G2', noteNamesIndex: 4,
        midiCode: 43, pianoKey: 23, freq: 98.00
    },
    {
        name: "Abb", frName: "la double bémol", octave: 2, fullName: 'Abb2', noteNamesIndex: 5,
        midiCode: 43, pianoKey: 23, freq: 98.00
    },
    {
        name: "G#", frName: "sol dièse", octave: 2, fullName: 'G#2', noteNamesIndex: 4,
        midiCode: 44, pianoKey: 24, freq: 103.83
    },
    {
        name: "Ab", frName: "la bémol", octave: 2, fullName: 'Ab2', noteNamesIndex: 5,
        midiCode: 44, pianoKey: 24, freq: 103.83
    },
    {
        name: "Bbbb", frName: "si triple bémol", octave: 2, fullName: 'Bbbb2', noteNamesIndex: 6,
        midiCode: 44, pianoKey: 24, freq: 103.83
    },
    {
        name: "G##", frName: "sol double dièse", octave: 2, fullName: 'G##2', noteNamesIndex: 4,
        midiCode: 45, pianoKey: 25, freq: 110.00
    },
    {
        name: "A", frName: "la", octave: 2, fullName: 'A2', noteNamesIndex: 5,
        midiCode: 45, pianoKey: 25, freq: 110.00
    },
    {
        name: "Bbb", frName: "si double bémol", octave: 2, fullName: 'Bbb2', noteNamesIndex: 6,
        midiCode: 45, pianoKey: 25, freq: 110.00
    },
    {
        name: "A#", frName: "la dièse", octave: 2, fullName: 'A#2', noteNamesIndex: 5,
        midiCode: 46, pianoKey: 26, freq: 116.54
    },
    {
        name: "Bb", frName: "si bémol", octave: 1, fullName: 'Bb2', noteNamesIndex: 6,
        midiCode: 46, pianoKey: 26, freq: 116.54
    },
    {
        name: "Cbb", frName: "do double bémol", octave: 3, fullName: 'Cbb3', noteNamesIndex: 0,
        midiCode: 46, pianoKey: 26, freq: 116.54
    },
    {
        name: "A##", frName: "la double dièse", octave: 2, fullName: 'A##2', noteNamesIndex: 5,
        midiCode: 47, pianoKey: 27, freq: 123.47
    },
    {
        name: "B", frName: "si", octave: 2, fullName: 'B2', noteNamesIndex: 6,
        midiCode: 47, pianoKey: 27, freq: 123.47
    },
    {
        name: "Cb", frName: "do bémol", octave: 3, fullName: 'Cb3', noteNamesIndex: 0,
        midiCode: 47, pianoKey: 27, freq: 123.47
    },
    {
        name: "B#", frName: "si dièse", octave: 2, fullName: 'B#2', noteNamesIndex: 6,
        midiCode: 48, pianoKey: 28, freq: 130.81
    },

    //__________ octave 3

    {
        name: "C", frName: "do", octave: 3, fullName: 'C3', noteNamesIndex: 0,
        midiCode: 48, pianoKey: 28, freq: 130.81
    },
    {
        name: "Dbb", frName: "ré double bémol", octave: 3, fullName: 'Dbb3', noteNamesIndex: 1,
        midiCode: 48, pianoKey: 28, freq: 130.81
    },
    {
        name: "B##", frName: "si double dièse", octave: 2, fullName: 'B##2', noteNamesIndex: 6,
        midiCode: 49, pianoKey: 29, freq: 138.59
    },
    {
        name: "C#", frName: "do dièse", octave: 3, fullName: 'C#3', noteNamesIndex: 0,
        midiCode: 49, pianoKey: 29, freq: 138.59
    },
    {
        name: "Db", frName: "ré bémol", octave: 3, fullName: 'Db3', noteNamesIndex: 1,
        midiCode: 49, pianoKey: 29, freq: 138.59
    },
    {
        name: "C##", frName: "do double dièse", octave: 3, fullName: 'C##3', noteNamesIndex: 0,
        midiCode: 50, pianoKey: 30, freq: 146.83
    },
    {
        name: "D", frName: "ré", octave: 3, fullName: 'D3', noteNamesIndex: 1,
        midiCode: 50, pianoKey: 30, freq: 146.83
    },
    {
        name: "Ebb", frName: "mi double bémol", octave: 3, fullName: 'Ebb3', noteNamesIndex: 2,
        midiCode: 50, pianoKey: 30, freq: 146.83
    },
    {
        name: "D#", frName: "ré dièse", octave: 3, fullName: 'D#3', noteNamesIndex: 1,
        midiCode: 51, pianoKey: 31, freq: 155.56
    },
    {
        name: "Eb", frName: "mi bémol", octave: 3, fullName: 'Eb3', noteNamesIndex: 2,
        midiCode: 51, pianoKey: 31, freq: 155.56
    },
    {
        name: "Fbb", frName: "Fa double bémol", octave: 3, fullName: 'Fbb3', noteNamesIndex: 3,
        midiCode: 51, pianoKey: 31, freq: 155.56
    },
    {
        name: "D##", frName: "ré double dièse", octave: 3, fullName: 'D##3', noteNamesIndex: 1,
        midiCode: 52, pianoKey: 32, freq: 164.81
    },
    {
        name: "E", frName: "mi", octave: 3, fullName: 'E3', noteNamesIndex: 2,
        midiCode: 52, pianoKey: 32, freq: 164.81
    },
    {
        name: "Fb", frName: "fa bémol", octave: 3, fullName: 'Fb3', noteNamesIndex: 3,
        midiCode: 52, pianoKey: 32, freq: 164.81
    },
    {
        name: "E#", frName: "mi dièse", octave: 3, fullName: 'E#3', noteNamesIndex: 2,
        midiCode: 53, pianoKey: 33, freq: 174.61
    },
    {
        name: "F", frName: "fa", octave: 3, fullName: 'F3', noteNamesIndex: 3,
        midiCode: 53, pianoKey: 33, freq: 174.61
    },
    {
        name: "Gbb", frName: "sol double bémol", octave: 3, fullName: 'Gbb3', noteNamesIndex: 4,
        midiCode: 53, pianoKey: 33, freq: 174.61
    },
    {
        name: "E##", frName: "mi double dièse", octave: 3, fullName: 'E##3', noteNamesIndex: 2,
        midiCode: 54, pianoKey: 34, freq: 185.00
    },
    {
        name: "F#", frName: "fa dièse", octave: 3, fullName: 'F#3', noteNamesIndex: 3,
        midiCode: 54, pianoKey: 34, freq: 185.00
    },
    {
        name: "Gb", frName: "sol bémol", octave: 3, fullName: 'Gb3', noteNamesIndex: 4,
        midiCode: 54, pianoKey: 34, freq: 185.00
    },
    {
        name: "F##", frName: "fa double dièse", octave: 3, fullName: 'F##3', noteNamesIndex: 3,
        midiCode: 55, pianoKey: 35, freq: 196.00
    },
    {
        name: "G", frName: "sol", octave: 3, fullName: 'G3', noteNamesIndex: 4,
        midiCode: 55, pianoKey: 35, freq: 196.00
    },
    {
        name: "Abb", frName: "la double bémol", octave: 3, fullName: 'Abb3', noteNamesIndex: 5,
        midiCode: 55, pianoKey: 35, freq: 196.00
    },
    {
        name: "G#", frName: "sol dièse", octave: 3, fullName: 'G#3', noteNamesIndex: 4,
        midiCode: 56, pianoKey: 36, freq: 207.65
    },
    {
        name: "Ab", frName: "la bémol", octave: 3, fullName: 'Ab3', noteNamesIndex: 5,
        midiCode: 56, pianoKey: 36, freq: 207.65
    },
    {
        name: "Bbbb", frName: "si triple bémol", octave: 3, fullName: 'Bbbb3', noteNamesIndex: 6,
        midiCode: 56, pianoKey: 36, freq: 207.65
    },
    {
        name: "G##", frName: "sol double dièse", octave: 3, fullName: 'G##3', noteNamesIndex: 4,
        midiCode: 57, pianoKey: 37, freq: 220.00
    },
    {
        name: "A", frName: "la", octave: 3, fullName: 'A3', noteNamesIndex: 5,
        midiCode: 57, pianoKey: 37, freq: 220.00
    },
    {
        name: "Bbb", frName: "si double bémol", octave: 3, fullName: 'Bbb3', noteNamesIndex: 6,
        midiCode: 57, pianoKey: 37, freq: 220.00
    },
    {
        name: "A#", frName: "la dièse", octave: 3, fullName: 'A#3', noteNamesIndex: 5,
        midiCode: 58, pianoKey: 38, freq: 233.08
    },
    {
        name: "Bb", frName: "si bémol", octave: 3, fullName: 'Bb3', noteNamesIndex: 6,
        midiCode: 58, pianoKey: 38, freq: 233.08
    },
    {
        name: "Cbb", frName: "do double bémol", octave: 4, fullName: 'Cbb3', noteNamesIndex: 0,
        midiCode: 58, pianoKey: 38, freq: 233.08
    },
    {
        name: "A##", frName: "la double dièse", octave: 3, fullName: 'A##3', noteNamesIndex: 5,
        midiCode: 59, pianoKey: 39, freq: 246.94
    },
    {
        name: "B", frName: "si", octave: 3, fullName: 'B3', noteNamesIndex: 6,
        midiCode: 59, pianoKey: 39, freq: 246.94
    },
    {
        name: "Cb", frName: "do bémol", octave: 4, fullName: 'Cb4', noteNamesIndex: 0,
        midiCode: 59, pianoKey: 39, freq: 246.94
    },
    {
        name: "B#", frName: "si dièse", octave: 3, fullName: 'B#3', noteNamesIndex: 6,
        midiCode: 60, pianoKey: 40, freq: 261.63
    },

    //__________ octave 4

    {
        name: "C", frName: "do", octave: 4, fullName: 'C4', noteNamesIndex: 0,
        midiCode: 60, pianoKey: 40, freq: 261.63
    },
    {
        name: "Dbb", frName: "ré double bémol", octave: 4, fullName: 'Dbb4', noteNamesIndex: 1,
        midiCode: 60, pianoKey: 40, freq: 261.63
    },
    {
        name: "B##", frName: "si double dièse", octave: 3, fullName: 'B##3', noteNamesIndex: 6,
        midiCode: 61, pianoKey: 41, freq: 277.18
    },
    {
        name: "C#", frName: "do dièse", octave: 4, fullName: 'C#4', noteNamesIndex: 0,
        midiCode: 61, pianoKey: 41, freq: 277.18
    },
    {
        name: "Db", frName: "ré bémol", octave: 4, fullName: 'Db4', noteNamesIndex: 1,
        midiCode: 61, pianoKey: 41, freq: 277.18
    },
    {
        name: "C##", frName: "do double dièse", octave: 4, fullName: 'C##4', noteNamesIndex: 0,
        midiCode: 62, pianoKey: 42, freq: 293.66
    },
    {
        name: "D", frName: "ré", octave: 4, fullName: 'D4', noteNamesIndex: 1,
        midiCode: 62, pianoKey: 42, freq: 293.66
    },
    {
        name: "Ebb", frName: "mi double bémol", octave: 4, fullName: 'Ebb4', noteNamesIndex: 2,
        midiCode: 62, pianoKey: 42, freq: 293.66
    },
    {
        name: "D#", frName: "ré dièse", octave: 4, fullName: 'D#4', noteNamesIndex: 1,
        midiCode: 63, pianoKey: 43, freq: 311.13
    },
    {
        name: "Eb", frName: "mi bémol", octave: 4, fullName: 'Eb4', noteNamesIndex: 2,
        midiCode: 63, pianoKey: 43, freq: 311.13
    },
    {
        name: "Fbb", frName: "Fa double bémol", octave: 4, fullName: 'Fbb4', noteNamesIndex: 3,
        midiCode: 63, pianoKey: 43, freq: 311.13
    },
    {
        name: "D##", frName: "ré double dièse", octave: 4, fullName: 'D##4', noteNamesIndex: 1,
        midiCode: 64, pianoKey: 44, freq: 329.63
    },
    {
        name: "E", frName: "mi", octave: 4, fullName: 'E4', noteNamesIndex: 2,
        midiCode: 64, pianoKey: 44, freq: 329.63
    },
    {
        name: "Fb", frName: "fa bémol", octave: 4, fullName: 'Fb4', noteNamesIndex: 3,
        midiCode: 64, pianoKey: 44, freq: 329.63
    },
    {
        name: "E#", frName: "mi dièse", octave: 4, fullName: 'E#4', noteNamesIndex: 2,
        midiCode: 65, pianoKey: 45, freq: 349.23
    },
    {
        name: "F", frName: "fa", octave: 4, fullName: 'F4', noteNamesIndex: 3,
        midiCode: 65, pianoKey: 45, freq: 349.23
    },
    {
        name: "Gbb", frName: "sol double bémol", octave: 4, fullName: 'Gbb4', noteNamesIndex: 4,
        midiCode: 65, pianoKey: 45, freq: 349.23
    },
    {
        name: "E##", frName: "mi double dièse", octave: 4, fullName: 'E##4', noteNamesIndex: 2,
        midiCode: 66, pianoKey: 46, freq: 369.99
    },
    {
        name: "F#", frName: "fa dièse", octave: 4, fullName: 'F#4', noteNamesIndex: 3,
        midiCode: 66, pianoKey: 46, freq: 369.99
    },
    {
        name: "Gb", frName: "sol bémol", octave: 4, fullName: 'Gb4', noteNamesIndex: 4,
        midiCode: 66, pianoKey: 46, freq: 369.99
    },
    {
        name: "F##", frName: "fa double dièse", octave: 4, fullName: 'F##4', noteNamesIndex: 3,
        midiCode: 67, pianoKey: 47, freq: 392.00
    },
    {
        name: "G", frName: "sol", octave: 4, fullName: 'G4', noteNamesIndex: 4,
        midiCode: 67, pianoKey: 47, freq: 392.00
    },
    {
        name: "Abb", frName: "la double bémol", octave: 4, fullName: 'Abb4', noteNamesIndex: 5,
        midiCode: 67, pianoKey: 47, freq: 392.00
    },
    {
        name: "G#", frName: "sol dièse", octave: 4, fullName: 'G#4', noteNamesIndex: 4,
        midiCode: 68, pianoKey: 48, freq: 415.30
    },
    {
        name: "Ab", frName: "la bémol", octave: 4, fullName: 'Ab4', noteNamesIndex: 5,
        midiCode: 68, pianoKey: 48, freq: 415.30
    },
    {
        name: "Bbbb", frName: "si triple bémol", octave: 4, fullName: 'Bbbb4', noteNamesIndex: 6,
        midiCode: 68, pianoKey: 48, freq: 415.30
    },
    {
        name: "G##", frName: "sol double dièse", octave: 4, fullName: 'G##4', noteNamesIndex: 4,
        midiCode: 69, pianoKey: 49, freq: 440.00
    },
    {
        name: "A", frName: "la", octave: 4, fullName: 'A4', noteNamesIndex: 5,
        midiCode: 69, pianoKey: 49, freq: 440.00
    },
    {
        name: "Bbb", frName: "si double bémol", octave: 4, fullName: 'Bbb4', noteNamesIndex: 6,
        midiCode: 69, pianoKey: 49, freq: 440.00
    },
    {
        name: "A#", frName: "la dièse", octave: 4, fullName: 'A#4', noteNamesIndex: 5,
        midiCode: 70, pianoKey: 50, freq: 466.16
    },
    {
        name: "Bb", frName: "si bémol", octave: 4, fullName: 'Bb4', noteNamesIndex: 6,
        midiCode: 70, pianoKey: 50, freq: 466.16
    },
    {
        name: "Cbb", frName: "do double bémol", octave: 5, fullName: 'Cbb5', noteNamesIndex: 0,
        midiCode: 70, pianoKey: 50, freq: 466.16
    },
    {
        name: "A##", frName: "la double dièse", octave: 4, fullName: 'A##4', noteNamesIndex: 5,
        midiCode: 71, pianoKey: 51, freq: 493.88
    },
    {
        name: "B", frName: "si", octave: 4, fullName: 'B4', noteNamesIndex: 6,
        midiCode: 71, pianoKey: 51, freq: 493.88
    },
    {
        name: "Cb", frName: "do bémol", octave: 5, fullName: 'Cb5', noteNamesIndex: 0,
        midiCode: 71, pianoKey: 51, freq: 493.88
    },
    {
        name: "B#", frName: "si dièse", octave: 4, fullName: 'B#4', noteNamesIndex: 6,
        midiCode: 72, pianoKey: 52, freq: 523.25
    },

// _____________________ Octave 5 ________________

    {
        name: "C", frName: "do", octave: 5, fullName: 'C5', noteNamesIndex: 0,
        midiCode: 72, pianoKey: 52, freq: 523.25
    },
    {
        name: "Dbb", frName: "ré double bémol", octave: 5, fullName: 'Dbb5', noteNamesIndex: 1,
        midiCode: 72, pianoKey: 52, freq: 523.25
    },
    {
        name: "B##", frName: "si double dièse", octave: 4, fullName: 'B##4', noteNamesIndex: 6,
        midiCode: 73, pianoKey: 53, freq: 554.37
    },
    {
        name: "C#", frName: "do dièse", octave: 5, fullName: 'C#5', noteNamesIndex: 0,
        midiCode: 73, pianoKey: 53, freq: 554.37
    },
    {
        name: "Db", frName: "ré bémol", octave: 5, fullName: 'Db5', noteNamesIndex: 1,
        midiCode: 73, pianoKey: 53, freq: 554.37
    },
    {
        name: "C##", frName: "do double dièse", octave: 5, fullName: 'C##5', noteNamesIndex: 0,
        midiCode: 74, pianoKey: 54, freq: 587.33
    },
    {
        name: "D", frName: "ré", octave: 5, fullName: 'D5', noteNamesIndex: 1,
        midiCode: 74, pianoKey: 54, freq: 587.33
    },
    {
        name: "Ebb", frName: "mi double bémol", octave: 5, fullName: 'Ebb5', noteNamesIndex: 2,
        midiCode: 74, pianoKey: 54, freq: 587.33
    },
    {
        name: "D#", frName: "ré dièse", octave: 5, fullName: 'D#5', noteNamesIndex: 1,
        midiCode: 75, pianoKey: 55, freq: 622.25
    },
    {
        name: "Eb", frName: "mi bémol", octave: 5, fullName: 'Eb5', noteNamesIndex: 2,
        midiCode: 75, pianoKey: 55, freq: 622.25
    },
    {
        name: "Fbb", frName: "Fa double bémol", octave: 5, fullName: 'Fbb5', noteNamesIndex: 3,
        midiCode: 75, pianoKey: 55, freq: 622.25
    },
    {
        name: "D##", frName: "ré double dièse", octave: 5, fullName: 'D##5', noteNamesIndex: 1,
        midiCode: 76, pianoKey: 56, freq: 659.26
    },
    {
        name: "E", frName: "mi", octave: 5, fullName: 'E5', noteNamesIndex: 2,
        midiCode: 76, pianoKey: 56, freq: 659.26
    },
    {
        name: "Fb", frName: "fa bémol", octave: 5, fullName: 'Fb5', noteNamesIndex: 3,
        midiCode: 76, pianoKey: 56, freq: 659.26
    },
    {
        name: "E#", frName: "mi dièse", octave: 5, fullName: 'E#5', noteNamesIndex: 2,
        midiCode: 77, pianoKey: 57, freq: 698.46
    },
    {
        name: "F", frName: "fa", octave: 5, fullName: 'F5', noteNamesIndex: 3,
        midiCode: 77, pianoKey: 57, freq: 698.46
    },
    {
        name: "Gbb", frName: "sol double bémol", octave: 5, fullName: 'Gbb5', noteNamesIndex: 4,
        midiCode: 77, pianoKey: 57, freq: 698.46
    },
    {
        name: "E##", frName: "mi double dièse", octave: 5, fullName: 'E##5', noteNamesIndex: 2,
        midiCode: 78, pianoKey: 58, freq: 739.99
    },
    {
        name: "F#", frName: "fa dièse", octave: 5, fullName: 'F#5', noteNamesIndex: 3,
        midiCode: 78, pianoKey: 58, freq: 739.99
    },
    {
        name: "Gb", frName: "sol bémol", octave: 5, fullName: 'Gb5', noteNamesIndex: 4,
        midiCode: 78, pianoKey: 58, freq: 739.99
    },
    {
        name: "F##", frName: "fa double dièse", octave: 5, fullName: 'F##5', noteNamesIndex: 3,
        midiCode: 79, pianoKey: 59, freq: 783.99
    },
    {
        name: "G", frName: "sol", octave: 5, fullName: 'G5', noteNamesIndex: 4,
        midiCode: 79, pianoKey: 59, freq: 783.99
    },
    {
        name: "Abb", frName: "la double bémol", octave: 5, fullName: 'Abb5', noteNamesIndex: 5,
        midiCode: 79, pianoKey: 59, freq: 783.99
    },
    {
        name: "G#", frName: "sol dièse", octave: 5, fullName: 'G#5', noteNamesIndex: 4,
        midiCode: 80, pianoKey: 60, freq: 830.61
    },
    {
        name: "Ab", frName: "la bémol", octave: 5, fullName: 'Ab5', noteNamesIndex: 5,
        midiCode: 80, pianoKey: 60, freq: 830.61
    },
    {
        name: "Bbbb", frName: "si triple bémol", octave: 5, fullName: 'Bbbb5', noteNamesIndex: 6,
        midiCode: 80, pianoKey: 60, freq: 830.61
    },
    {
        name: "G##", frName: "sol double dièse", octave: 5, fullName: 'G##5', noteNamesIndex: 4,
        midiCode: 81, pianoKey: 61, freq: 880.00
    },
    {
        name: "A", frName: "la", octave: 5, fullName: 'A5', noteNamesIndex: 5,
        midiCode: 81, pianoKey: 61, freq: 880.00
    },
    {
        name: "Bbb", frName: "si double bémol", octave: 5, fullName: 'Bbb5', noteNamesIndex: 6,
        midiCode: 81, pianoKey: 61, freq: 880.00
    },
    {
        name: "A#", frName: "la dièse", octave: 5, fullName: 'A#5', noteNamesIndex: 5,
        midiCode: 82, pianoKey: 62, freq: 932.33
    },
    {
        name: "Bb", frName: "si bémol", octave: 5, fullName: 'Bb5', noteNamesIndex: 6,
        midiCode: 82, pianoKey: 62, freq: 932.33
    },
    {
        name: "Cbb", frName: "do double bémol", octave: 6, fullName: 'Cbb6', noteNamesIndex: 0,
        midiCode: 82, pianoKey: 62, freq: 932.33
    },
    {
        name: "A##", frName: "la double dièse", octave: 5, fullName: 'A##5', noteNamesIndex: 5,
        midiCode: 83, pianoKey: 63, freq: 987.77
    },
    {
        name: "B", frName: "si", octave: 5, fullName: 'B5', noteNamesIndex: 6,
        midiCode: 83, pianoKey: 63, freq: 987.77
    },
    {
        name: "Cb", frName: "do bémol", octave: 6, fullName: 'Cb6', noteNamesIndex: 0,
        midiCode: 83, pianoKey: 63, freq: 987.77
    },
    {
        name: "B#", frName: "si dièse", octave: 5, fullName: 'B#5', noteNamesIndex: 6,
        midiCode: 84, pianoKey: 64, freq: 1046.50
    },

    // Octave 6 _________

    {
        name: "C", frName: "do", octave: 6, fullName: 'C6', noteNamesIndex: 0,
        midiCode: 84, pianoKey: 64, freq: 1046.50
    },
    {
        name: "Dbb", frName: "ré double bémol", octave: 6, fullName: 'Dbb6', noteNamesIndex: 1,
        midiCode: 84, pianoKey: 64, freq: 1046.50
    },
    {
        name: "B##", frName: "si double dièse", octave: 5, fullName: 'B##5', noteNamesIndex: 6,
        midiCode: 85, pianoKey: 65, freq: 1108.73
    },
    {
        name: "C#", frName: "do dièse", octave: 6, fullName: 'C#6', noteNamesIndex: 0,
        midiCode: 85, pianoKey: 65, freq: 1108.73
    },
    {
        name: "Db", frName: "ré bémol", octave: 6, fullName: 'Db6', noteNamesIndex: 1,
        midiCode: 85, pianoKey: 65, freq: 1108.73
    },
    {
        name: "C##", frName: "do double dièse", octave: 6, fullName: 'C##6', noteNamesIndex: 0,
        midiCode: 86, pianoKey: 66, freq: 1174.66
    },
    {
        name: "D", frName: "ré", octave: 6, fullName: 'D6', noteNamesIndex: 1,
        midiCode: 86, pianoKey: 66, freq: 1174.66
    },
    {
        name: "Ebb", frName: "mi double bémol", octave: 6, fullName: 'Ebb6', noteNamesIndex: 2,
        midiCode: 86, pianoKey: 66, freq: 1174.66
    },
    {
        name: "D#", frName: "ré dièse", octave: 6, fullName: 'D#6', noteNamesIndex: 1,
        midiCode: 87, pianoKey: 67, freq: 1244.51
    },
    {
        name: "Eb", frName: "mi bémol", octave: 5, fullName: 'Eb6', noteNamesIndex: 2,
        midiCode: 87, pianoKey: 67, freq: 1244.51
    },
    {
        name: "Fbb", frName: "Fa double bémol", octave: 6, fullName: 'Fbb6', noteNamesIndex: 3,
        midiCode: 87, pianoKey: 67, freq: 1244.51
    },
    {
        name: "D##", frName: "ré double dièse", octave: 6, fullName: 'D##6', noteNamesIndex: 1,
        midiCode: 88, pianoKey: 68, freq: 	1318.51
    },
    {
        name: "E", frName: "mi", octave: 6, fullName: 'E6', noteNamesIndex: 2,
        midiCode: 88, pianoKey: 68, freq: 	1318.51
    },
    {
        name: "Fb", frName: "fa bémol", octave: 6, fullName: 'Fb6', noteNamesIndex: 3,
        midiCode: 88, pianoKey: 68, freq: 	1318.51
    },
    {
        name: "E#", frName: "mi dièse", octave: 6, fullName: 'E#6', noteNamesIndex: 2,
        midiCode: 89, pianoKey: 69, freq: 1396.91
    },
    {
        name: "F", frName: "fa", octave: 6, fullName: 'F6', noteNamesIndex: 3,
        midiCode: 89, pianoKey: 69, freq: 1396.91
    },
    {
        name: "Gbb", frName: "sol double bémol", octave: 6, fullName: 'Gbb6', noteNamesIndex: 4,
        midiCode: 89, pianoKey: 69, freq: 1396.91
    },
    {
        name: "E##", frName: "mi double dièse", octave: 6, fullName: 'E##6', noteNamesIndex: 2,
        midiCode: 90, pianoKey: 70, freq: 1479.98
    },
    {
        name: "F#", frName: "fa dièse", octave: 6, fullName: 'F#6', noteNamesIndex: 3,
        midiCode: 90, pianoKey: 70, freq: 1479.98
    },
    {
        name: "Gb", frName: "sol bémol", octave: 6, fullName: 'Gb6', noteNamesIndex: 4,
        midiCode: 90, pianoKey: 70, freq: 1479.98
    },
    {
        name: "F##", frName: "fa double dièse", octave: 6, fullName: 'F##6', noteNamesIndex: 3,
        midiCode: 91, pianoKey: 71, freq: 1567.98
    },
    {
        name: "G", frName: "sol", octave: 6, fullName: 'G6', noteNamesIndex: 5,
        midiCode: 91, pianoKey: 71, freq: 1567.98
    },
    {
        name: "Abb", frName: "la double bémol", octave: 6, fullName: 'Abb6', noteNamesIndex: 5,
        midiCode: 91, pianoKey: 71, freq: 1567.98
    },
    {
        name: "G#", frName: "sol dièse", octave: 6, fullName: 'G#6', noteNamesIndex: 4,
        midiCode: 92, pianoKey: 72, freq: 1661.22
    },
    {
        name: "Ab", frName: "la bémol", octave: 6, fullName: 'Ab6', noteNamesIndex: 5,
        midiCode: 92, pianoKey: 72, freq: 1661.22
    },
    {
        name: "Bbbb", frName: "si triple bémol", octave: 6, fullName: 'Bbbb6', noteNamesIndex: 6,
        midiCode: 92, pianoKey: 72, freq: 1661.22
    },
    {
        name: "G##", frName: "sol double dièse", octave: 6, fullName: 'G##6', noteNamesIndex: 4,
        midiCode: 93, pianoKey: 73, freq: 1760.00
    },
    {
        name: "A", frName: "la", octave: 6, fullName: 'A6', noteNamesIndex: 5,
        midiCode: 93, pianoKey: 73, freq: 1760.00
    },
    {
        name: "Bbb", frName: "si double bémol", octave: 6, fullName: 'Bbb6', noteNamesIndex: 6,
        midiCode: 93, pianoKey: 73, freq: 1760.00
    },
    {
        name: "A#", frName: "la dièse", octave: 6, fullName: 'A#6', noteNamesIndex: 5,
        midiCode: 94, pianoKey: 74, freq: 1864.66
    },
    {
        name: "Bb", frName: "si bémol", octave: 6, fullName: 'Bb6', noteNamesIndex: 6,
        midiCode: 94, pianoKey: 74, freq: 1864.66
    },
    {
        name: "Cbb", frName: "do double bémol", octave: 7, fullName: 'Cbb7', noteNamesIndex: 0,
        midiCode: 94, pianoKey: 74, freq: 1864.66
    },
    {
        name: "A##", frName: "la double dièse", octave: 6, fullName: 'A##6', noteNamesIndex: 5,
        midiCode: 95, pianoKey: 75, freq: 1975.53
    },
    {
        name: "B", frName: "si", octave: 6, fullName: 'B6', noteNamesIndex: 6,
        midiCode: 95, pianoKey: 75, freq: 1975.53
    },
    {
        name: "Cb", frName: "do bémol", octave: 7, fullName: 'Cb7', noteNamesIndex: 0,
        midiCode: 95, pianoKey: 75, freq: 1975.53
    },
    {
        name: "B#", frName: "si dièse", octave: 6, fullName: 'B#6', noteNamesIndex: 6,
        midiCode: 96, pianoKey: 76, freq: 2093.00
    },
    {
        name: "C", frName: "do", octave: 7, fullName: 'C7', noteNamesIndex: 0,
        midiCode: 96, pianoKey: 76, freq: 2093.00
    }
]

const cards = [
    { id: 0, shortEnName:'uni1' , enName: 'perfect unison', frName: 'unisson juste', steps: 0, halfSteps: 0, probaPourCent: 0, direction: 1, difficulty: 0},
    { id: 1, shortEnName:'asA1' , enName: 'ascending augmented unison', frName: 'unisson augmenté ascendant', steps: 0, halfSteps: 1, probaPourCent: 0, direction: 1, difficulty: 1},
    { id: 2, shortEnName:'deA1' , enName: 'descending augmented unison', frName: 'unisson augmenté descendant', steps: 0, halfSteps: -1, probaPourCent: 0, direction: -1, difficulty: 1},
    { id: 3, shortEnName:'as-2' , enName: 'ascending minor second', frName: 'seconde mineure ascendante', steps: 1, halfSteps: 1, probaPourCent: 0, direction: 1, difficulty: 1},
    { id: 4, shortEnName:'de-2' , enName: 'descending minor second', frName: 'seconde mineure descendante', steps: -1, halfSteps: -1, probaPourCent: 0, direction: -1, difficulty: 1},
    { id: 5, shortEnName:'asM2' , enName: 'ascending major second', frName: 'seconde majeure ascendante', steps: 1, halfSteps: 2, probaPourCent: 0, direction: 1, difficulty: 1},
    { id: 6, shortEnName:'deM2' , enName: 'descending major second', frName: 'seconde majeure descendante', steps: -1, halfSteps: -2, probaPourCent: 0, direction: -1, difficulty: 1},
    { id: 7, shortEnName:'as-3' , enName: 'ascending minor third', frName: 'tierce mineure ascendante', steps: 2, halfSteps: 3, probaPourCent: 0, direction: 1, difficulty: 2},
    { id: 8, shortEnName:'de-3' , enName: 'descending minor third', frName: 'tierce mineure descendante', steps: -2, halfSteps: -3, probaPourCent: 0, direction: -1, difficulty: 2},
    { id: 9, shortEnName:'asM3' , enName: 'ascending major third', frName: 'tierce majeure ascendante', steps: 2, halfSteps: 4, probaPourCent: 0, direction: 1, difficulty: 2},
    { id: 10, shortEnName:'deM3' , enName: 'descending major third', frName: 'tierce majeure descendante', steps: -2, halfSteps: -4, probaPourCent: 0, direction: -1, difficulty: 2},
    { id: 11, shortEnName:'asD4' , enName: 'ascending diminished fourth', frName: 'quarte diminuée ascendante', steps: 3, halfSteps: 4, probaPourCent: 0, direction: 1, difficulty: 4},
    { id: 12, shortEnName:'deD4' , enName: 'descending diminished fourth', frName: 'quarte diminuée descendante', steps: -3, halfSteps: -4, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 13, shortEnName:'asP4' , enName: 'ascending perfect fourth', frName: 'quarte juste ascendante', steps: 3, halfSteps: 5, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 14, shortEnName:'deP4' , enName: 'descending perfect fourth', frName: 'quarte juste descendante', steps: -3, halfSteps: -5, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 15, shortEnName:'asA4' , enName: 'ascending augmented fourth', frName: 'quarte augmentée ascendante', steps: 3, halfSteps: 6, probaPourCent: 0, direction: 1, difficulty: 4},
    { id: 16, shortEnName:'deA4' , enName: 'descending augmented fourth', frName: 'quarte augmentée descendante', steps: -3, halfSteps: -6, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 17, shortEnName:'asD5' , enName: 'ascending diminished fifth', frName: 'quinte diminuée ascendante', steps: 4, halfSteps: 6, probaPourCent: 0, direction: 1, difficulty: 4},
    { id: 18, shortEnName:'deD5' , enName: 'descending diminished fifth', frName: 'quinte diminuée descendante', steps: -4, halfSteps: -6, probaPourCent: 3, direction: -1, difficulty: 4},
    { id: 19, shortEnName:'asP5' , enName: 'ascending perfect fifth', frName: 'quinte juste ascendante', steps: 4, halfSteps: 7, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 20, shortEnName:'deP5' , enName: 'descending perfect fifth', frName: 'quinte juste descendante', steps: -4, halfSteps: -7, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 21, shortEnName:'asA5' , enName: 'ascending augmented fifth', frName: 'quinte augmentée ascendante', steps: 4, halfSteps: 8, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 22, shortEnName:'deA5' , enName: 'descending augmented fifth', frName: 'quinte augmentée descendante', steps: -4, halfSteps: -8, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 23, shortEnName:'as-6' , enName: 'ascending minor sixth', frName: 'sixte mineure ascendante', steps: 5, halfSteps: 8, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 24, shortEnName:'de-6' , enName: 'descending minor sixth', frName: 'sixte mineure descendante', steps: -5, halfSteps: -8, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 25, shortEnName:'asM6' , enName: 'ascending major sixth', frName: 'sixte majeure ascendante', steps: 5, halfSteps: 9, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 26, shortEnName:'deM6' , enName: 'descending major sixth', frName: 'sixte majeure descendante', steps: -5, halfSteps: -9, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 27, shortEnName:'asD7' , enName: 'ascending diminished seventh', frName: 'septième diminuée ascendante', steps: 6, halfSteps: 9, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 28, shortEnName:'deD7' , enName: 'descending diminished seventh', frName: 'septième diminuée descendante', steps: -6, halfSteps: -9, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 29, shortEnName:'as-7' , enName: 'ascending minor seventh', frName: 'septième mineure ascendante', steps: 6, halfSteps: 10, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 30, shortEnName:'de-7' , enName: 'descending minor seventh', frName: 'septième mineure descendante', steps: -6, halfSteps: -10, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 31, shortEnName:'asM7' , enName: 'ascending major seventh', frName: 'septième majeure ascendante', steps: 6, halfSteps: 11, probaPourCent: 0, direction: 1, difficulty: 3},
    { id: 32, shortEnName:'deM7' , enName: 'descending major seventh', frName: 'septième majeure descendante', steps: -6, halfSteps: -11, probaPourCent: 0, direction: -1, difficulty: 3},
    { id: 33, shortEnName:'asP8' , enName: 'ascending perfect octave', frName: 'octave juste ascendante', steps: 7, halfSteps: 12, probaPourCent: 0, direction: 1, difficulty: 0},
    { id: 34, shortEnName:'deP8' , enName: 'descending perfect octave', frName: 'octave juste descendante', steps: -7, halfSteps: -12, probaPourCent: 0, direction: -1, difficulty: 0},
    { id: 35, shortEnName:'asA8' , enName: 'ascending augmented octave', frName: 'octave augmentée ascendante', steps: 7, halfSteps: 13, probaPourCent: 0, direction: 1, difficulty: 5},
    { id: 36, shortEnName:'deA8' , enName: 'descending augmented octave', frName: 'octave augmentée descendante', steps: -7, halfSteps: -13, probaPourCent: 0, direction: -1, difficulty: 5},
    
    { id: 36, shortEnName:'as-9' , enName: 'ascending minor ninth', frName: 'neuvième mineure ascendante', steps: 8, halfSteps: 13, probaPourCent: 0, direction: 1, difficulty: 5},
    { id: 37, shortEnName:'as-9' , enName: 'descending minor ninth', frName: 'neuvième mineure descendante', steps: -8, halfSteps: -13, probaPourCent: 0, direction: -1, difficulty: 5},
    { id: 38, shortEnName:'asM9' , enName: 'ascending major ninth', frName: 'neuvième majeure ascendante', steps: 8, halfSteps: 14, probaPourCent: 0, direction: 1, difficulty: 5},
    { id: 39, shortEnName:'deM9' , enName: 'descending major ninth', frName: 'neuvième majeure descendante', steps: -8, halfSteps: -14, probaPourCent: 0, direction: -1, difficulty: 5},
    { id: 40, shortEnName:'asA9' , enName: 'ascending augmented ninth', frName: 'neuvième augmentée ascendante', steps: 8, halfSteps: 15, probaPourCent: 0, direction: 1, difficulty: 5},
    { id: 41, shortEnName:'deA9' , enName: 'descending augmented ninth', frName: 'neuvième augmentée descendante', steps: -8, halfSteps: -15, probaPourCent: 0, direction: -1, difficulty: 5},
    { id: 42, shortEnName:'as-10' , enName: 'ascending minor tenth', frName: 'dixième mineure ascendante', steps: 9, halfSteps: 15, probaPourCent: 0, direction: 1, difficulty: 4},
    { id: 43, shortEnName:'de-10' , enName: 'descending minor tenth', frName: 'dixième mineure descendante', steps: -9, halfSteps: -15, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 44, shortEnName:'asM10' , enName: 'ascending major tenth', frName: 'dixième majeure ascendante', steps: 9, halfSteps: 16, probaPourCent: 0, direction: 1, difficulty: 4},
    { id: 45, shortEnName:'deM10' , enName: 'descending major tenth', frName: 'dixième majeure descendante', steps: -9, halfSteps: -16, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 46, shortEnName:'asP11' , enName: 'ascending perfect eleventh', frName: 'onzième juste ascendante', steps: 10, halfSteps: 17, probaPourCent: 0, direction: 1, difficulty: 4},
    { id: 47, shortEnName:'deP11' , enName: 'descending perfect eleventh', frName: 'onzième juste descendante', steps: -10, halfSteps: -17, probaPourCent: 0, direction: -1, difficulty: 4},    
    { id: 48, shortEnName:'asA11' , enName: 'ascending augmented eleventh', frName: 'onzième augmentée ascendante', steps: 10, halfSteps: 18, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 49, shortEnName:'deA11' , enName: 'descending augmented eleventh', frName: 'onzième augmentée descendante', steps: -10, halfSteps: -18, probaPourCent: 0, direction: -1, difficulty: 4}, 
    { id: 50, shortEnName:'asD12' , enName: 'ascending diminished twelfth', frName: 'douzième diminuée ascendante', steps: 11, halfSteps: 18, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 51, shortEnName:'deD12' , enName: 'descending diminished twelfth', frName: 'douzième diminuée descendante', steps: -11, halfSteps: -18, probaPourCent: 0, direction: -1, difficulty: 4},     
    { id: 52, shortEnName:'asP12' , enName: 'ascending perfect twelfth', frName: 'douzième juste ascendante', steps: 11, halfSteps: 19, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 53, shortEnName:'deP12' , enName: 'descending perfect twelfth', frName: 'douzième juste descendante', steps: -11, halfSteps: -19, probaPourCent: 0, direction: -1, difficulty: 4},    
    { id: 54, shortEnName:'asA12' , enName: 'ascending augmented twelfth', frName: 'douzième augmentée ascendante', steps: 11, halfSteps: 20, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 55, shortEnName:'deA12' , enName: 'descending augmented twelfth', frName: 'douzième augmentée descendante', steps: -11, halfSteps: -20, probaPourCent: 0, direction: -1, difficulty: 4}, 
    { id: 56, shortEnName:'as-13' , enName: 'ascending minor thirteenth', frName: 'treisième mineure ascendante', steps: 12, halfSteps: 20, probaPourCent: 0, direction: 1, difficulty: 4},       
    { id: 57, shortEnName:'de-13' , enName: 'descending minor thirteenth', frName: 'treisième mineure descendante', steps: -12, halfSteps: -20, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 58, shortEnName:'asM13' , enName: 'ascending major thirteenth', frName: 'treisième majeure ascendante', steps: 12, halfSteps: 21, probaPourCent: 0, direction: 1, difficulty: 4},       
    { id: 59, shortEnName:'deM13' , enName: 'descending major thirteenth', frName: 'treisième majeure descendante', steps: -12, halfSteps: -21, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 60, shortEnName:'as-14' , enName: 'ascending minor fourteenth', frName: 'quatorzième mineure ascendante', steps: 13, halfSteps: 22, probaPourCent: 0, direction: 1, difficulty: 4},       
    { id: 61, shortEnName:'de-14' , enName: 'descending minor fourteenth', frName: 'quatorzième mineure descendante', steps: -13, halfSteps: -22, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 62, shortEnName:'asM14' , enName: 'ascending major fourteenth', frName: 'quatorzième majeure ascendante', steps: 13, halfSteps: 23, probaPourCent: 0, direction: 1, difficulty: 4},       
    { id: 63, shortEnName:'deM14' , enName: 'descending major fourteenth', frName: 'quatorzième majeure descendante', steps: -13, halfSteps: -23, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 64, shortEnName:'asP15' , enName: 'ascending perfect fifteenth', frName: 'quinzième juste ascendante', steps: 14, halfSteps: 24, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 65, shortEnName:'deP15' , enName: 'descending perfect fifteenth', frName: 'quinzième juste descendante', steps: -14, halfSteps: -24, probaPourCent: 0, direction: -1, difficulty: 4},

    { id: 66, shortEnName:'as-16' , enName: 'ascending minor sixteenth', frName: 'seizième mineure ascendante', steps: 15, halfSteps: 25, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 67, shortEnName:'de-16' , enName: 'descending minor sixteenth', frName: 'seizième mineure descendante', steps: -15, halfSteps: -25, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 68, shortEnName:'asM16' , enName: 'ascending major sixteenth', frName: 'seizième majeure ascendante', steps: 15, halfSteps: 26, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 69, shortEnName:'deM16' , enName: 'descending major sixteenth', frName: 'seizième majeure descendante', steps: -15, halfSteps: -26, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 70, shortEnName:'as-17' , enName: 'ascending minor seventeenth', frName: 'dix-septième mineure ascendante', steps: 16, halfSteps: 27, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 71, shortEnName:'de-17' , enName: 'descending minor seventeenth', frName: 'dix-septième mineure descendante', steps: -16, halfSteps: -27, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 73, shortEnName:'asM17' , enName: 'ascending major seventeenth', frName: 'dix-septième majeure descendante', steps: -16, halfSteps: -28, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 74, shortEnName:'deM17' , enName: 'descending major seventeenth', frName: 'dix-septième majeure descendante', steps: -16, halfSteps: -28, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 75, shortEnName:'asP18' , enName: 'ascending perfect eighteenth', frName: 'dix-huitième juste ascendante', steps: 17, halfSteps: 29, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 76, shortEnName:'deP18' , enName: 'descending perfect eighteenth', frName: 'dix-huitième juste descendante', steps: -17, halfSteps: -29, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 77, shortEnName:'asA18' , enName: 'ascending augmented eighteenth', frName: 'dix-huitième augmentée ascendante', steps: 17, halfSteps: 30, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 78, shortEnName:'deA18' , enName: 'descending augmented eighteenth', frName: 'dix-huitième augmentée descendante', steps: -17, halfSteps: -30, probaPourCent: 0, direction: -1, difficulty: 4},
    { id: 79, shortEnName:'asP19' , enName: 'ascending perfect nineteenth', frName: 'dix-huitième augmentée ascendante', steps: 18, halfSteps: 31, probaPourCent: 0, direction: 1, difficulty: 4},    
    { id: 80, shortEnName:'deP19' , enName: 'descending perfect nineteenth', frName: 'dix-huitième augmentée descendante', steps: -18, halfSteps: -31, probaPourCent: 0, direction: -1, difficulty: 4}
]

const scales = [
    {id: 0, enName: 'inexistant'},
    {id: 1, enName:'major', frName:'majeur', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending major third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending major sixth', 'ascending major seventh', 'ascending perfect octave'], AbbrStepNames:['2', '3', '4', '5', '6', '7', '8']},
    {id: 2, enName:'natural minor', frName:'mineur naturel', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending minor third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending minor sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['2', 'b3', '4', '5', 'b6', 'b7', '8']},
    {id: 3, enName:'harmonic minor', frName:'mineur harmonique', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending minor third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending minor sixth', 'ascending major seventh', 'ascending perfect octave'], AbbrStepNames:['2', 'b3', '4', '5', 'b6', '7', '8']},
    {id: 4, enName:'melodic minor', frName:'mineur mélodique', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending minor third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending major sixth', 'ascending major seventh', 'ascending perfect octave'], AbbrStepNames:['2', 'b3', '4', '5', '6', '7', '8']},
    {id: 5, enName:'lydian', frName:'lydien', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending major third', 'ascending augmented fourth', 'ascending perfect fifth', 'ascending major sixth', 'ascending major seventh', 'ascending perfect octave'], AbbrStepNames:['2', '3', '#4', '5', '6', '7', '8']},
    {id: 6, enName:'mixolydian', frName:'mixolydien', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending major third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending major sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['2', '3', '4', '5', '6', 'b7', '8']},
    {id: 7, enName:'dorian', frName:'dorien', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending minor third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending major sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['2', 'b3', '4', '5', '6', 'b7', '8']},
    {id: 8, enName:'phrygian', frName:'phrygien', nbOfSteps:7, probaPourCent: 0, steps:['ascending minor second', 'ascending minor third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending minor sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['b2', 'b3', '4', '5', 'b6', 'b7', '8']},
    {id: 9, enName:'locrian', frName:'locrien', nbOfSteps:7, probaPourCent: 0, steps:['ascending minor second', 'ascending minor third', 'ascending perfect fourth', 'ascending diminished fifth', 'ascending minor sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['b2', 'b3', '4', 'b5', 'b6', 'b7', '8']},
    {id: 10, enName:'lydian augmented', frName:'lydien augmenté', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending major third', 'ascending augmented fourth', 'ascending augmented fifth', 'ascending major sixth', 'ascending major seventh', 'ascending perfect octave'], AbbrStepNames:['2', '3', '#4', '#5', '6', '7', '8']},
    {id: 11, enName:'lydian dominant', frName:'lydien dominante', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending major third', 'ascending augmented fourth', 'ascending perfect fifth', 'ascending major sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['2', '3', '#4', '5', '6', 'b7', '8']},
    {id: 12, enName:'mixolydian ♭6', frName:'mixolydien ♭6', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending major third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending minor sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['2', '3', '4', '5', 'b6', 'b7', '8']},
    {id: 13, enName:'phrygian ♮6', frName:'phrygien ♮6', nbOfSteps:7, probaPourCent: 0, steps:['ascending minor second', 'ascending minor third', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending major sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['b2', 'b3', '4', '5', '6', 'b7', '8']},
    {id: 14, enName:'locrian ♮2', frName:'locrien ♮2', nbOfSteps:7, probaPourCent: 0, steps:['ascending major second', 'ascending minor third', 'ascending perfect fourth', 'ascending diminished fifth', 'ascending minor sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['2', 'b3', '4', 'b5', 'b6', 'b7', '8']},
    {id: 15, enName:'altered', frName:'altéré', nbOfSteps:7, probaPourCent: 0, steps:['ascending minor second', 'ascending minor third', 'ascending diminished fourth', 'ascending diminished fifth', 'ascending minor sixth', 'ascending minor seventh', 'ascending perfect octave'], AbbrStepNames:['b2', 'b3', 'b4', 'b5', 'b6', 'b7', '8']}
]

const chords = [
    // Basic triads
    {id: 0, nature: 0, enName:'major triad', frName:'triade majeure', inversion: 'fondamental position', structuretype: 'close', type:"basicTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth'], AbbrStepNames:['1', '3', '5']},
    {id: 1, nature: 1, enName:'minor triad', frName:'triade mineure', inversion: 'fondamental position', structuretype: 'close', type:"basicTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending perfect fifth'], AbbrStepNames:['1', 'b3', '5']},
    {id: 2, nature: 2, enName:'diminished triad', frName:'triade diminuée', inversion: 'fondamental position', structuretype: 'close', type:"basicTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending diminished fifth'], AbbrStepNames:['1', 'b3', 'b5']},
    {id: 3, nature: 3, enName:'augmented triad', frName:'triade augmentée', inversion: 'fondamental position', structuretype: 'close', type:"basicTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending augmented fifth'], AbbrStepNames:['1', '3', '#5']},
    {id: 4, nature: 4, enName:'sus4 triad', frName:'triade sus4', inversion: 'fondamental position', structuretype: 'close', type:"basicTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fourth', 'ascending perfect fifth'], AbbrStepNames:['1', '4', '5']},
    {id: 5, nature: 5, enName:'sus2 triad', frName:'triade sus2', inversion: 'fondamental position', structuretype: 'close', type:"basicTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending major second', 'ascending perfect fifth'], AbbrStepNames:['1', '2', '5']},
    
    // Triads Open Structures and inversions
    {id: 10, nature: 0, enName:'major triad /3', frName:'triade majeure /3', inversion: '/3 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending major third', 'ascending perfect fifth', 'ascending perfect octave'], AbbrStepNames:['3', '5', '1']},
    {id: 11, nature: 0, enName:'major triad /5', frName:'triade majeure /5', inversion: '/5 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending perfect fifth', 'ascending perfect octave', 'ascending major tenth'], AbbrStepNames:['5', '1', '3']},
    {id: 12, nature: 0, enName:'major triad d2', frName:'triade majeure d2', inversion: 'fondamental position', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fifth', 'ascending major tenth'], AbbrStepNames:['1', '5', '3']},
    {id: 13, nature: 0, enName:'major triad d2 /3', frName:'triade majeure d2 /3', inversion: '/3 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending major third', 'ascending perfect octave', 'ascending perfect twelfth'], AbbrStepNames:['3', '1', '5']},
    {id: 14, nature: 0, enName:'major triad d2 /5', frName:'triade majeure d2 /5', inversion: '/5 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending perfect fifth', 'ascending major tenth', 'ascending perfect fifteenth'], AbbrStepNames:['5', '3', '1']},
    {id: 15, nature: 1, enName:'minor triad /b3', frName:'triade mineure /b3', inversion: '/b3 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending minor third', 'ascending perfect fifth', 'ascending perfect octave'], AbbrStepNames:['b3', '5', '1']},
    {id: 16, nature: 1, enName:'minor triad /5', frName:'triade mineure /5', inversion: '/5 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending perfect fifth', 'ascending perfect octave', 'ascending minor tenth'], AbbrStepNames:['5', '1', 'b3']},
    {id: 17, nature: 1, enName:'minor triad d2', frName:'triade mineure d2', inversion: 'fondamental position', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fifth', 'ascending minor tenth'], AbbrStepNames:['1', '5', 'b3']},
    {id: 18, nature: 1, enName:'minor triad d2 /b3', frName:'triade mineure d2 /b3', inversion: '/b3 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending minor third', 'ascending perfect octave', 'ascending perfect twelfth'], AbbrStepNames:['b3', '1', '5']},
    {id: 19, nature: 1, enName:'minor triad d2 /5', frName:'triade mineure d2 /5', inversion: '/5 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending perfect fifth', 'ascending minor tenth', 'ascending perfect fifteenth'], AbbrStepNames:['5', 'b3', '1']},
    {id: 20, nature: 2, enName:'diminished triad /b3', frName:'triade diminuée /b3', inversion: '/b3 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending minor third','ascending diminished fifth', 'ascending perfect octave'], AbbrStepNames:['b3', 'b5', '1']},
    {id: 21, nature: 2, enName:'diminished triad /b5', frName:'triade diminuée /b5', inversion: '/b5 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending diminished fifth', 'ascending perfect octave', 'ascending minor tenth'], AbbrStepNames:['b5', '1', 'b3']},
    {id: 22, nature: 2, enName:'diminished triad d2', frName:'triade diminuée d2', inversion: 'fondamental position', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison','ascending diminished fifth', 'ascending minor tenth'], AbbrStepNames:['1', 'b5', 'b3']},
    {id: 23, nature: 2, enName:'diminished triad d2 /b3', frName:'triade diminuée d2 /b3', inversion: '/b3 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending minor third', 'ascending perfect octave', 'ascending diminished twelfth'], AbbrStepNames:['b3', '1', 'b5']},
    {id: 24, nature: 2, enName:'diminished triad d2 /b5', frName:'triade diminuée d2 /b5', inversion: '/b5 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending diminished fifth', 'ascending minor tenth', 'ascending perfect fifteenth'], AbbrStepNames:['b5', 'b3', '1']},
    {id: 25, nature: 3, enName:'augmented triad /3', frName:'triade augmentée /3', inversion: '/3 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending major third','ascending augmented fifth', 'ascending perfect octave'], AbbrStepNames:['3', '#5', '1']},
    {id: 26, nature: 3, enName:'augmented triad /#5', frName:'triade augmentée /#5', inversion: '/#5 inversion', structuretype: 'close', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending augmented fifth', 'ascending perfect octave', 'ascending major tenth'], AbbrStepNames:['#5', '1', '3']},
    {id: 27, nature: 3, enName:'augmented triad d2', frName:'triade augmentée d2', inversion: 'fondamental position', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison','ascending augmented fifth', 'ascending major tenth'], AbbrStepNames:['1', '#5', '3']},
    {id: 28, nature: 3, enName:'augmented triad d2 /3', frName:'triade augmentée d2 /3', inversion: '/3 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending major third', 'ascending perfect octave', 'ascending augmented twelfth'], AbbrStepNames:['3', '1', '#5']},
    {id: 29, nature: 3, enName:'augmented triad d2 /#5', frName:'triade augmentée d2 /#5', inversion: '/#5 inversion', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['ascending augmented fifth', 'ascending major tenth', 'ascending perfect fifteenth'], AbbrStepNames:['#5', '3', '1']},
    {id: 30, nature: 4, enName:'sus4 triad d2', frName:'triade sus4 d2', inversion: 'fondamental position', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fifth', 'ascending perfect eleventh'], AbbrStepNames:['1', '5', '4']},
    {id: 31, nature: 5, enName:'sus2 triad d2', frName:'triade sus2 d2', inversion: 'fondamental position', structuretype: 'drop 2', type:"openOrInvTriad", bottomNoteHighLimit: "E5", nbOfNotes:3, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fifth', 'ascending major ninth'], AbbrStepNames:['1', '5', '2']},

    // basic 4 notes chords
    {id: 100, nature: 10, enName:'maj7 chord', frName:'accord maj7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending major seventh'], AbbrStepNames:['1', '3', '5', '7']},
    {id: 101, nature: 11, enName:'7 chord', frName:'accord 7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending minor seventh'], AbbrStepNames:['1', '3', '5', 'b7']},
    {id: 102, nature: 12, enName:'min7 chord', frName:'accord min7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending perfect fifth', 'ascending minor seventh'], AbbrStepNames:['1', 'b3', '5', 'b7']},
    {id: 103, nature: 13, enName:'min7b5 chord', frName:'accord min7b5', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending diminished fifth', 'ascending minor seventh'], AbbrStepNames:['1', 'b3', 'b5', 'b7']},
    {id: 104, nature: 14, enName:'7sus4 chord', frName:'accord 7sus4', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending minor seventh'], AbbrStepNames:['1', '4', '5', 'b7']},
    {id: 105, nature: 15, enName:'6 chord', frName:'accord 6', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending major sixth'], AbbrStepNames:['1', '3', '5', '6']},
    {id: 106, nature: 16, enName:'+maj7 chord', frName:'accord +maj7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending augmented fifth', 'ascending major seventh'], AbbrStepNames:['1', '3', '#5', '7']},
    {id: 107, nature: 17, enName:'+7 chord', frName:'accord +7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending augmented fifth', 'ascending minor seventh'], AbbrStepNames:['1', '3', '#5', 'b7']},
    {id: 108, nature: 18, enName:'-maj7 chord', frName:'accord minMaj7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending perfect fifth', 'ascending major seventh'], AbbrStepNames:['1', 'b3', '5', '7']},
    {id: 109, nature: 19, enName:'dim7 chord', frName:'accord dim7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending diminished fifth', 'ascending diminished seventh'], AbbrStepNames:['1', 'b3', 'b5', 'bb7']},
    {id: 110, nature: 20, enName:'dimMaj7 chord', frName:'accord dimMaj7', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending diminished fifth', 'ascending major seventh'], AbbrStepNames:['1', 'b3', 'b5', '7']},
    {id: 111, nature: 21, enName:'min6 chord', frName:'accord min6', inversion: 'fondamental position', structuretype: 'close', type:"basic4notesChord", bottomNoteHighLimit: "Eb4", nbOfNotes:4, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending perfect fifth', 'ascending major sixth'], AbbrStepNames:['1', 'b3', '5', '6']},
    
    // Ext Chords1
    {id: 200, nature: 50, enName:'+maj9 chord', frName:'accord +maj9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending augmented fifth', 'ascending major seventh', 'ascending major ninth'], AbbrStepNames:['1', '3', '#5', '7', '9']},
    {id: 201, nature: 51, enName:'maj9 chord', frName:'accord maj9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending major seventh', 'ascending major ninth'], AbbrStepNames:['1', '3', '5', '7', '9']},
    {id: 202, nature: 52, enName:'7,9 chord', frName:'accord 7,9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending minor seventh', 'ascending major ninth'], AbbrStepNames:['1', '3', '5', 'b7', '9']},
    {id: 203, nature: 53, enName:'7,b9 chord', frName:'accord 7,b9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending minor seventh', 'ascending minor ninth'], AbbrStepNames:['1', '3', '5', 'b7', 'b9']},
    {id: 204, nature: 54, enName:'7#9 chord', frName:'accord 7,#9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending minor seventh', 'ascending augmented ninth'], AbbrStepNames:['1', '3', '5', 'b7', '9']},
    {id: 205, nature: 55, enName:'+7,9 chord', frName:'accord +7,9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending augmented fifth', 'ascending minor seventh', 'ascending major ninth'], AbbrStepNames:['1', '3', '#5', 'b7', '9']},
    {id: 206, nature: 56, enName:'min9 chord', frName:'accord min9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending perfect fifth', 'ascending minor seventh', 'ascending major ninth'], AbbrStepNames:['1', 'b3', '5', 'b7', '9']},
    {id: 207, nature: 57, enName:'6,9 chord', frName:'accord 6,9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending major third', 'ascending perfect fifth', 'ascending major sixth', 'ascending major ninth'], AbbrStepNames:['1', 'b3', '5', 'b7', '9']},
    {id: 208, nature: 58, enName:'min6,9 chord', frName:'accord min6,9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending perfect fifth', 'ascending major sixth', 'ascending major ninth'], AbbrStepNames:['1', 'b3', '5', 'b7', '9']},
    {id: 209, nature: 59, enName:'7sus4,9 chord', frName:'accord 7sus,9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fourth', 'ascending perfect fifth', 'ascending minor seventh', 'ascending major ninth'], AbbrStepNames:['1', '4', '5', 'b7', '9']},      
    {id: 210, nature: 60, enName:'-7b5,9 chord', frName:'accord -7b5,9', inversion: 'fondamental position', structuretype: 'close', type:"extChord1", bottomNoteHighLimit: "G4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending minor third', 'ascending diminished fifth', 'ascending minor seventh', 'ascending major ninth'], AbbrStepNames:['1', 'b3', '5', 'b7', '9']},

    // Modal maj
    {id: 300, nature: 100, enName:'lydian chord', frName:'accord lydien', inversion: 'fondamental position', structuretype: 'super structure', type:"modalChordMaj", bottomNoteHighLimit: "F3", nbOfNotes:6, probaPourCent: 0, steps:['perfect unison', 'ascending major seventh', 'ascending major tenth', 'ascending major thirteenth', 'ascending major sixteenth', 'ascending augmented eighteenth'], AbbrStepNames:['1', '7', '3', '13', '9', '#4↑']},
    {id: 301, nature: 101, enName:'ionian chord', frName:'accord ionien', inversion: 'fondamental position', structuretype: 'mixed', type:"modalChordMaj", bottomNoteHighLimit: "C4", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending perfect fourth', 'ascending major seventh', 'ascending major ninth', 'ascending major tenth'], AbbrStepNames:['1', '4', '7', '9', '10']},
    {id: 302, nature: 102, enName:'mixolydian chord', frName:'accord mixolydien', inversion: 'fondamental position', structuretype: 'spread', type:"modalChordMaj", bottomNoteHighLimit: "Bb3", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending minor seventh', 'ascending major ninth', 'ascending major tenth', 'ascending major thirteenth'], AbbrStepNames:['1', 'b7', '9', '10', '13']},
    {id: 303, nature: 103, enName:'dorian chord', frName:'accord dorien', inversion: 'fondamental position', structuretype: 'quartal', type:"modalChordMaj", bottomNoteHighLimit: "E3", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending minor tenth', 'ascending major thirteenth', 'ascending major sixteenth', 'ascending perfect nineteenth'], AbbrStepNames:['1', 'b10', '13', '9↑', '5↑']},
    {id: 304, nature: 104, enName:'eolian chord', frName:'accord éolien', inversion: 'fondamental position', structuretype: 'mixed', type:"modalChordMaj", bottomNoteHighLimit: "G3", nbOfNotes:6, probaPourCent: 0, steps:['perfect unison', 'ascending minor sixth', 'ascending minor seventh', 'ascending minor tenth', 'ascending perfect twelfth', 'ascending perfect fifteenth'], AbbrStepNames:['1', 'b6', 'b7', 'b10', '12', '1↑']},
    {id: 305, nature: 105, enName:'phrygian chord', frName:'accord phrygien', inversion: 'fondamental position', structuretype: 'mixed', type:"modalChordMaj", bottomNoteHighLimit: "G3", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending minor ninth', 'ascending perfect eleventh', 'ascending perfect twelfth', 'ascending perfect fifteenth'], AbbrStepNames:['1', 'b9', '11', '12', '1↑']},
    {id: 306, nature: 106, enName:'locrian chord', frName:'accord locrien', inversion: 'fondamental position', structuretype: 'terciary', type:"modalChordMaj", bottomNoteHighLimit: "E3", nbOfNotes:5, probaPourCent: 0, steps:['perfect unison', 'ascending minor tenth', 'ascending diminished twelfth', 'ascending minor fourteenth', 'ascending minor sixteenth'], AbbrStepNames:['1', 'b10', 'b5', 'b7', 'b9']},
]
 
let dictationCards;
let limitedToLILCards;
let simpleNotes;

function notesAndCardsInit() {
    // console.log('CALL notesAndCardsInit');
    // let intDictDirectionChoice = 'asc';
    dictationCards = buildDictationCards();
    limitedToLILCards;
    simpleNotes = getSimpleNotes();
    register = getRegisterAndSettingsFromSoundBank();
}

function buildDictationCards() {
    // console.log('CALL buildDictationCards');
    // console.log('intDictDirectionChoice = ' + intDictDirectionChoice);
    // Ici on épure 'cards' des intervalles non-souhaités (enharmonismes), et on renomme les #4 et b5 en 'triton'
    // console.log('buildIntervalDictationCards');
    let dictationCards = [];
    //let indice = 0
    cards.forEach(card => {
        //console.log('each card : card = ' + card.enName);
        if (
            ((card.enName.includes('diminished fifth') || card.enName.includes('augmented ninth')) 
            || ((!card.enName.includes('augmented'))
            && (!card.enName.includes('diminished')) 
            && (!card.enName.includes('unison')))) 
            && (card.direction > 0)) {
            // ){
            //console.log('buildIntervalDictationCards --- card ok');
            let newCard = {};
            newCard.enName = card.enName.split(' ').slice(1).join(' ');
            newCard.frName = card.frName.split(' ')[0] + " " + card.frName.split(' ')[1];
            if (newCard.enName.includes('augmented fourth') || newCard.enName.includes('diminished fifth')) {
                newCard.enName = "tritone";
                newCard.frName = "triton";
            } 
            newCard.id = card.id;
            newCard.steps = card.steps;
            newCard.halfSteps = card.halfSteps;
            newCard.probaPourCent = card.probaPourCent;
            newCard.direction = card.direction;
            /* if (intDictDirectionChoice === 'asc') {
                newCard.direction = 1; // pour avoir que des mouvements ascendants
            } 
            if (intDictDirectionChoice === 'desc') {
                newCard.direction = -1;
            }
            if (intDictDirectionChoice === 'both') {
                newCard.direction = card.direction;
            } */
            // switch (intDictDirectionChoice) {
            //     case 'both':
            //         dictationCards.push(newCard);
            //         break;
            //     case 'asc':
            //         if (newCard.direction === 1) dictationCards.push(newCard);
            //         break;
            //     case 'desc':
            //         if (newCard.direction === -1) dictationCards.push(newCard);
            //         break;
            // }
            dictationCards.push(newCard);
        }
    })
    // console.log('FIN buildDictationCards - dictationCards : ', dictationCards);
    //console.log('cards : ');
    //console.log(cards);
    return dictationCards;
}

function pickDictationNote1(tenthsChecked, mode){
    // console.log('pickDictationNote1 - register', register);
    let pickedNote;
    let semitonesMargin = 12
    if (tenthsChecked) {
        semitonesMargin = 16;
    }
    // on veut avoir au moins un octave au dessus, voir une M10 si les 9ème sont cochées
    let upperlimitNoteForNoteChoice = simpleNotes.find((note)=> {return (note.pianoKey === (register.highLimitNote.pianoKey-semitonesMargin))});
    // console.log('upperlimitNoteForNoteChoice -> ' + upperlimitNoteForNoteChoice.fullName);

    let rand = Math.floor(Math.random() * (upperlimitNoteForNoteChoice.pianoKey - register.lowLimitNote.pianoKey) + register.lowLimitNote.pianoKey);
    // (génère un nombre entier aléatoire compris entre register.lowLimitNote.pianoKey et upperlimitNoteForNoteChoice.pianoKey inclus (c’est-à-dire dans l’intervalle [lowLimit, upperLimit]).)
    
    //console.log('rand ' + rand);
    // On limite les notes en-dessous de F2 (pianoKey = 21) (on obtient trop de quintes / octaves sinon avec les limite d'intervalle grave)
    if ((rand < 21) && (mode == 'intervalId')) { // Si la sélection est en-dessous de F2 (dans le cas de la dictée d'intervalles)
        if (Math.random() < .99) { // (99%)
            rand = rand + 12 // très souvent on passe à l'octave au dessus
            console.log("Low note avoided (proba 98%)")
        } 
    }
    // On renvoit
    pickedNote = simpleNotes.find((note) => {return (note.pianoKey === rand)});
    // console.log('pickDictationNote1 : ' + pickedNote.fullName);
    return pickedNote;
} 

function findNextNoteNameWithInterval(steps, direction, givenNote) {
    let cMajor = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let offset = direction > 0 ? steps : (cMajor.length + steps);
    let index = (givenNote.noteNamesIndex + offset + cMajor.length) % cMajor.length;
    return cMajor[index];
}

function reviseStepsWithRegister(givenCard, givenNote, register) {
    // console.log ('reviseStepsWithRegister - register : ', register);
    const nextPianoKey = givenNote.pianoKey + givenCard.halfSteps;
    //console.log ('givenCard.halfSteps -> ' + givenCard.halfSteps + ' | givenCard.direction -> ' + givenCard.direction);
    let revisedHalfSteps = givenCard.halfSteps;
    let transpositionOctave = 'No octave transposition';
    if (nextPianoKey < register.lowLimitNote.pianoKey) {
        transpositionOctave = '8va';
        console.log('Note trop basse -> transpositionOctave ' + transpositionOctave);
        if (Math.abs(givenCard.halfSteps) <= 12) {
            // console.log('intervalle <= octave');
            revisedHalfSteps = -givenCard.direction * (12 - Math.abs(givenCard.halfSteps));
        } else {
            // Cas des intervalles redoublés (9èmes etc...)
            revisedHalfSteps = -givenCard.direction * (24 - Math.abs(givenCard.halfSteps));
            //console.log('revisedHalfSteps -> ' + revisedHalfSteps);
        }

    } else if (nextPianoKey > register.highLimitNote.pianoKey) {
        transpositionOctave = '8vb';
        console.log('Note trop haute -> transpositionOctave ' + transpositionOctave);
        if (Math.abs(givenCard.halfSteps) <= 12) {
            //console.log('intervalles <= octave');
            revisedHalfSteps = -givenCard.direction * (12 - Math.abs(givenCard.halfSteps));
        } else {
            // Cas des intervalles redoublés (9èmes etc...)
            revisedHalfSteps = -givenCard.direction * (24 - Math.abs(givenCard.halfSteps));
            //console.log('revisedHalfSteps -> ' + revisedHalfSteps);
        }
    }
    if (revisedHalfSteps !== givenCard.halfSteps) {
        console.log("%c" + '   reviseStepsWithRegister --> revisedHalfSteps : ' + revisedHalfSteps, "color: green;")
        if (mode == 'scaleId') {
            console.warn("On a un cas qui ne devrait pas arriver : modification d'intervalle pour limite de registre alors que le mode est sur 'scaleId'");
            // En effet : le registre est en principe assez grand (au moins un octave, voire 2) pour une gamme
        }
    }
    // ?????? un soucis avec l'affichage de transpositionOctave ?
    return [revisedHalfSteps, transpositionOctave];
}

function getEnharmonicReplacement(givenCard, nextPossibleNote) {
    const enharmCase = [
        { match: '##', steps: 1 },
        { match: 'bbb', steps: -2 },
        { match: 'bb', steps: -1 },
        { match: 'E#', steps: 1 },
        { match: 'B#', steps: 1 },
        { match: 'Cb', steps: -1 },
        { match: 'Fb', steps: -1 },
    ];

    let replacement = nextPossibleNote;
    let replEnharmonismName = 'No enharmonism';

    for (let enhCase of enharmCase) {
        if (nextPossibleNote.name.includes(enhCase.match) && mode !== 'scaleId') {
            // console.log('replEnharmonismName -> Remplacement proposé');
            replEnharmonismName = nextPossibleNote.name;
            const enharmName = findNextNoteNameWithInterval(enhCase.steps, givenCard.direction, nextPossibleNote);
            const found = notes.find(n =>
                n.pianoKey === nextPossibleNote.pianoKey &&
                n.name.startsWith(enharmName)
            );
            if (found) {
                replacement = found;
                break;
            }
        }
    }
    // console.log('replEnharmonismName : ' + replEnharmonismName);
    return { replacement, replEnharmonismName };
}

function findNextNote(givenCard, givenNote, register) {
    // console.log ('findNextNote - register : ', register);
    // console.log ('findNextNote - givenCard ', givenCard);
    const newNoteName = findNextNoteNameWithInterval(givenCard.steps, givenCard.direction, givenNote);
    const [revisedHalfSteps, transpositionOctave] = reviseStepsWithRegister(givenCard, givenNote, register);
    // console.log('findNextNote - transpositionOctave -> ' + transpositionOctave);
    const nextForeseenNote = notes.find(note =>
        note.pianoKey === (givenNote.pianoKey + revisedHalfSteps) &&
        note.name.startsWith(newNoteName)
    );

    if (!nextForeseenNote) {
        console.warn("Aucune note trouvée correspondant à la description !");
        console.log ('findNextNote - newNoteName ', newNoteName);
        console.log ('findNextNote - revisedHalfSteps ', revisedHalfSteps);
        console.log ('findNextNote - transpositionOctave ', transpositionOctave);
        return null;
    }
    
    const {replacement, replEnharmonismName } = getEnharmonicReplacement(givenCard, nextForeseenNote, notes);
    // console.log('replEnharmonismName : ' + replEnharmonismName);
    const result = {
        foundNote: replacement,
        replacedEnharmonism: replEnharmonismName,
        octaveTransposition: transpositionOctave
    };
    return result;
}

function limitCardstoLowIntervalLimits(givenNote, deck) {
    // console.log('CALL limitCardstoLowIntervalLimits -- givenNote.pianoKey = ' + givenNote.pianoKey);
    //console.log('limitCardstoLowIntervalLimits - deck : ');
    //console.log(deck);
    let clonedDeck = [];
    clonedDeck = JSON.parse(JSON.stringify(deck))  // méthode pour cloner un objet
    if (!respectLILChk.checked) {return clonedDeck}; // désactivation optionnelle

    function dropThisInterval(halfSteps) {
        //console.log('dropThisInterval')
        const index = clonedDeck.findIndex(card => card.halfSteps === halfSteps);
        if (index !== -1) {
        clonedDeck.splice(index, index+1);
        }
    }
    switch (true) {
        // no limit for unison and octaves

        case (givenNote.pianoKey < 14): // 14 = Bb1
            //console.log('<14');
            dropThisInterval(1);
            dropThisInterval(2);
            dropThisInterval(3);
            dropThisInterval(4);
            dropThisInterval(5);
            dropThisInterval(6);
            dropThisInterval(8);
            dropThisInterval(9);
            dropThisInterval(10);
            dropThisInterval(7); // limite pour les quintes
            break;

        case (givenNote.pianoKey < 21): // 21 = F2
            //console.log('<21');
            dropThisInterval(1);
            dropThisInterval(2);
            dropThisInterval(3);
            dropThisInterval(4);
            dropThisInterval(5);
            dropThisInterval(6);
            dropThisInterval(8); 
            dropThisInterval(9); // limite pour les 6te majeures
            dropThisInterval(10); // limite pour les 7ème mineures
            dropThisInterval(11); // limite pour les 7ème majeures
            break;

        case (givenNote.pianoKey < 23): // 23 = G2
            //console.log('<23');
            dropThisInterval(1);
            dropThisInterval(2);
            dropThisInterval(3);
            dropThisInterval(4);
            dropThisInterval(5);
            dropThisInterval(6);
            dropThisInterval(8); // limite pour les 6te mineures
            break;

        case (givenNote.pianoKey < 26): // 26 = Bb2
            //console.log('<26');
            dropThisInterval(1);
            dropThisInterval(2);
            dropThisInterval(3);
            dropThisInterval(4); // Limite pour les tierces majeures
            dropThisInterval(5); // ... les quartes
            dropThisInterval(6); // ... et les tritons
            break;

        case (givenNote.pianoKey < 28): // 28 = C3
            //console.log('<28');
            dropThisInterval(1);
            dropThisInterval(2);
            dropThisInterval(3); // Limite pour les tierces mineures
            break;
        
        case (givenNote.pianoKey < 31): // 31 = Eb3
            //console.log('<31');
            dropThisInterval(1);
            dropThisInterval(2); // Limite pour les secondes majeures
            break;

        case (givenNote.pianoKey < 32): // 32 = E3
            //console.log('<32');
            dropThisInterval(1); // Limite pour les secondes mineures
            break;

    }
    //console.log('limitedtoLowIntervalLimitsDeck : ');
    //console.log(clonedDeck);
    return (clonedDeck) ;
}

function getNextIntervallicDictCard(givenNote) {
    // console.log('CALL getNextIntervallicDictCard');
    // Ici on veut éviter d'avoir strictement l'intervalle précédent répété
    if (seqHistory.length < 2) { // il nous faut au moins un intervalle précédent 
        return getRandCard(givenNote);
    } else {
        const possibleNextCard = getRandCard(givenNote);
        if (seqHistory[seqHistory.length - 1].previousNote === givenNote
            && seqHistory[seqHistory.length - 1].card === possibleNextCard) {
            console.log ('cas de répétition de card');
            return getRandCard(givenNote); // On cherche une nouvelle card
        } else {
            return possibleNextCard; // On envoie celle qu'on a trouvée
        }
    }
}

function getRandCard() {
// function getRandCard(givenNote) {
    // console.log('CALL getRandCard -----');
    // L'enjeu de départ est de transformer les probabilités 
    // des cartes (ex : [0.1, 0.2, 0.4...]) dans une array du genre : cardWeigths = [10, 20, 80...]; 
    // où chaque pondération est la somme des pondérations (en pourcentage) du rang (max 100)
    
    if (!isSumWeightsEquals100()) {
        console.log("%c Problème : ", "color: red ;", 'Somme des proba \<\> 100');
    }

    const deck = (mode === 'intervalId') ? limitedToLILCards : cards;

    // Creation de l'array des pondérations
    const cardWeigths = deck.map((card) => {return card.probaPourCent;}); 
    //console.log('cardWeigths : ');
    //console.log(cardWeigths);

    // Creation de l'array des "pondérations sommées"   
    let summedCardWeights=[];
    for (let c = 0; c < cardWeigths.length; c++) {
        if (c == 0) {
            summedCardWeights.push(cardWeigths[c]);
        } else {
            let push = cardWeigths[c] + summedCardWeights[c-1];
            summedCardWeights.push(push);
        }
    }
    // console.log('summedCardWeights : ');
    // console.log(summedCardWeights);
 
    // procéder au tirage au sort
    const random100 = Math.random() * 100; // nb entre 0 et 100
    const index = summedCardWeights.findIndex(weight => random100 < weight);

    if (index !== -1) {
        const pickedCard = deck[index]; // deck[i] correspond à la carte
        console.log("%c   mouvement sélectionné -> " + capitalizeFirstLetterFlexible(pickedCard.enName) + ' HalfSteps = ' + pickedCard.halfSteps, "color: green ;");

        //console.log(`Picked card: ${pickedCard.enName}`);
        return pickedCard;
    }

    console.warn("%c Problème dans GetRandomCard: ", "color: red ;", 'Aucune carte tirée au sort !');
    return -1;
}

function isSumWeightsEquals100() {
  const deck = (mode === 'intervalId') ? limitedToLILCards : cards;
  const sumWeights = deck.reduce((sum, card) => sum + card.probaPourCent, 0);
  return (sumWeights > 99.99 && sumWeights < 100.1);
}

function countPossibleCardsForProbs(deck, numberOfdirections) {
    //console.log('countPossibleCardsForProbs_ deck : ');
    //console.log(deck);
    //console.log(config);
    let count = 0;

    function checkPresence(fonctionTest) {
        return deck.some(function(deckCard) {return fonctionTest(deckCard);}); // La méthode .some() parcourt toutes les cartes du tableau deck.
    }

    // Seconds
    if (config.seconds && checkPresence(c => c.enName.includes('minor second')))
        count += numberOfdirections; 
    if (config.seconds && checkPresence(c => c.enName.includes('major second')))
        count += numberOfdirections;
    // Thirds
    if (config.thirds && checkPresence(c => c.enName.includes('minor third')))
        count += numberOfdirections;
    if (config.thirds && checkPresence(c => c.enName.includes('major third')))
        count += numberOfdirections;
    // Fourth & Fifth
    if (config.fourths && checkPresence(c => c.halfSteps === 5))
        count += numberOfdirections;
    if (config.fifths && checkPresence(c => c.halfSteps === 7))
        count += numberOfdirections;
    // Sixths
    if (config.sixths && checkPresence(c => c.enName.includes('minor sixth')))
        count += numberOfdirections;
    if (config.sixths && checkPresence(c => c.enName.includes('major sixth')))
        count += numberOfdirections;
    // Seventh
    if (config.sevenths && checkPresence(c => c.enName.includes('minor seventh')))
        count += numberOfdirections; 
    if (config.sevenths && checkPresence(c => c.enName.includes('major seventh')))
        count += numberOfdirections;
    if (config.sevenths && checkPresence(c => c.enName.includes('diminished seventh')))
        count += numberOfdirections;
    // Neuvièmes
    if (config.ninths && checkPresence(c => c.enName.includes('minor ninth')))
        count += numberOfdirections;
    if (config.ninths && checkPresence(c => c.enName.includes('major ninth')))
        count += numberOfdirections;
    // Dixièmes
    if (config.tenths && checkPresence(c => c.enName.includes('minor tenth')))
        count += numberOfdirections;
    if (config.tenths && checkPresence(c => c.enName.includes('major tenth')))
        count += numberOfdirections;
    // Tritons
    const hasTritone = checkPresence(c => c.halfSteps === 6);
    if (hasTritone) {
        if (mode === 'intervalId') {
            if (config.tritones) count += numberOfdirections; // 1x
        } else {
        if (config.augFourthsAndDimFifths) count += numberOfdirections * 2; // 2x
        if (config.augFithsAndDimFifths) count += numberOfdirections * 2;
        if (config.augUnisonSecondsAndOctaves) count += numberOfdirections * 2;
        }
    }

    console.log ('countPossibleCardsForProbs - count = ' + count);  
    return count;
}

function calculateIntervalProbabilities(config) {
    // console.log('CALL calcultateProbabilities - mode : ' + mode + ' - config : ', config);

    // On veut déterminer pour chaque carte la probabilité à associer
    // Chaque carte sera équiprobable (à l'exception des unissons, limités à 1%)
    // On exclu les unissons et les octaves (justes), toujours présent (à 0,5% tout cumulés) --> 3 cartes
    // D'abord quel nombre total de cartes représente la config ?
    const deck = (mode === 'intervalId') ? limitedToLILCards : cards;
    const nbReservedCards = (mode === 'intervalId') ? 1 : 3;
    let numberOfdirections = (mode === 'intervalId')? 1 : 2;
    // if (mode === 'intervalId') {
        // numberOfdirections = (intDictDirectionChoice === 'both') ? 2 : 1;
    // }
    let reservedProba = 0.5; 
    let count = 0;

    // console.log('calculateIntervalProbabilities - Deck : ', deck);

    // Calcul du nombre total de cartes possibles selon la config
    count = countPossibleCardsForProbs(deck, numberOfdirections);
    if (count === 0) {
        // Si aucune carte n’est éligible, tout va à la probabilité réservée
        reservedProba = 100;
    } else {
        var equiprobability = (100 - reservedProba) / count;
    }
    
    /* count = countPossibleCardsForProbs(deck, numberOfdirections);
  
    if (count === 0) { reservedProba = 100 }; // cas où on est en limite basse et où seules octaves et/ou unissons sont possibles
    //console.log('calculateIntervalProbabilities - count=' + count);
    equiprobability = (100 - reservedProba) / count;
    //console.log('calculateIntervalProbabilities - equiprobability=' + equiprobability); */

    // On a donc count cartes. la proba de chacune (sélectionnés) est donc de 100/count (0 pour les autres)
    //console.log('deck :');
    //console.log(deck);
    deck.forEach(card => {
        /* if (config.seconds) { */
            if ((card.halfSteps === 0)) { // unisons (exclus pour dictations)
                card.probaPourCent = (mode === 'intervalId') ? 0 : reservedProba / nbReservedCards;
            }
            else if (Math.abs(card.halfSteps) === 12) { // octaves
                card.probaPourCent = reservedProba/(nbReservedCards);
            // intervalles selon config
            } else if (config.seconds && (card.enName.includes('major second') || card.enName.includes('minor second'))) {
                card.probaPourCent = equiprobability;
            } else if (config.thirds && (card.enName.includes('major third') || card.enName.includes('minor third'))) {
                card.probaPourCent = equiprobability;
            } else if (config.fourths && (card.enName.includes('perfect fourth'))) {
                card.probaPourCent = equiprobability;
            } else if (config.fifths && (card.enName.includes('perfect fifth'))) {
                card.probaPourCent = equiprobability;
            } else if (config.sixths && (card.enName.includes('major sixth') || card.enName.includes('minor sixth'))) {
                card.probaPourCent = equiprobability;
            } else if (config.sevenths && (card.enName.includes('major seventh') || card.enName.includes('minor seventh') || (card.enName.includes('diminished seventh') && mode === 'sing'))) {
                card.probaPourCent = equiprobability;
            } else if (
                (mode==='sing' && config.augFourthsAndDimFifths && Math.abs(card.halfSteps) === 6)
                || (mode==='intervalId' && config.tritones && Math.abs(card.halfSteps) === 6)) { // tritones
                card.probaPourCent = equiprobability;
            } else if (config.augFithsAndDimFourths && (card.enName.includes('augmented fifth') || card.enName.includes('diminished fourth'))) {
                card.probaPourCent = equiprobability;
            } else if ((config.augUnisonSecondsAndOctaves) && (card.enName.includes('augmented unison') || card.enName.includes('augmented octave'))) {
                card.probaPourCent = equiprobability;
            } else if ((config.ninths) && (card.enName.includes('minor ninth') || card.enName.includes('major ninth'))) {
                card.probaPourCent = equiprobability;
            } else if ((config.tenths) && (card.enName.includes('minor tenth') || card.enName.includes('major tenth'))) {
                card.probaPourCent = equiprobability;
            } else {card.probaPourCent = 0}
    });

    // On va mapper cards pour un log lisible
    reducedCards = deck.map((card) => {
        return {frName: card.enName, pourcentPb: card.probaPourCent};
    })
    console.log ('cards après calcul des probs : ');
    console.log(reducedCards);
}

function getNoteWithFullName(fullName) {
    let foundNote = notes.find((note) => {return (note.fullName == fullName);})
    //console.log('foundNote -> '+foundNote);
    return foundNote;
}

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

function getOnlyNaturalAndFlatNotes() {
    let onlyNaturalAndFlatNotes = notes.filter((note) => { 
        if(!note.fullName.includes('#') 
        && !note.fullName.includes('##') 
        && !note.fullName.includes('bb')
        && !note.fullName.includes('Fb')
        && !note.fullName.includes('Cb')) {
            // console.log(note.fullName);
            return note;
        }
    });
    //console.log('onlyNaturalAndFlatNotes : ');
    //console.log(onlyNaturalAndFlatNotes);
    // onlyNaturalAndFlatNotes[0] --> C1
    // onlyNaturalAndFlatNotes[12] --> C2 (key = 16)
    // onlyNaturalAndFlatNotes[24] --> C3 (key = 28)
    // onlyNaturalAndFlatNotes[36] --> C4
    // onlyNaturalAndFlatNotes[48] --> C5
    // onlyNaturalAndFlatNotes[60] --> C6
    return onlyNaturalAndFlatNotes;
}

function getSimpleNotes() {
    // console.log('CALL getSimpleNotes');
    let simpleNotes = notes.filter((note) => { 
        if(!note.fullName.includes('E#') 
        && !note.fullName.includes('##') 
        && !note.fullName.includes('bb')
        && !note.fullName.includes('Fb')
        && !note.fullName.includes('B#')
        && !note.fullName.includes('Cb')) {
            // console.log(note.fullName);
            return note;
        }
    });
    //console.log('onlyNaturalAndFlatNotes : ');
    // console.log(onlyNaturalAndFlatNotes);
    return simpleNotes;
}

function provideBetterChoice (proposedNote, register, returnMoveSubstitutionProba) {
    // Il s'agit ici d'éviter les aller-retour F --> G --> F par exemple

    //console.log('Start provideBetterChoice - seqHistory : ');
    //console.log(seqHistory);
    //console.log('Start provideBetterChoice proposedNote.pianoKey  : ' + proposedNote.fullName + " key=  " + proposedNote.pianoKey);
   
    let substitutedNote;
    let substitutionOccured = false
    if (seqHistory.length > 1) { // on a besoin d'un peu d'historique
        //console.log('On filtre, ou pas...');
        //console.log('seqHistory[seqHistory.length-2].previousNote.pianoKey = ' + seqHistory[seqHistory.length-2].currentNote.pianoKey);
        
        if (proposedNote.pianoKey === seqHistory[seqHistory.length-2].currentNote.pianoKey) {
            // console.log('%cprovideBetterChoice - cas de répétition de la note n-1', "color: red");
            if (Math.random() > returnMoveSubstitutionProba) {
                console.log('%c***   Return movement case accepted (' + returnMoveSubstitutionProba*100 + '%)', "color: HotPink");
                return returnResult(proposedNote, replacedEnharmonism, octaveTransposition, card);
            }
            let sameProblem = true; let tries=0;
            while (sameProblem) {
                tries++;
                //console.log('trying another note - tries = ' + tries);
                //triedNote = findNextNote();
                card = getRandCard();
                //console.log('newCard = ' + card.enName + ' halfsteps = ' + card.halfSteps);
                ({foundNote, replacedEnharmonism, octaveTransposition} = findNextNote(card, previousNote, register));
                //console.log(foundNote);
                //console.log('provideBetterChoice - foundNote : ' + foundNote.fullName + ' keyNote = ' + foundNote.pianoKey);
                //console.log('seqHistory[seqHistory.length-2].currentNote.pianoKey : ' + seqHistory[seqHistory.length-2].currentNote.pianoKey)
                //console.log('égalité ? : ' + (foundNote.pianoKey === seqHistory[seqHistory.length-2].currentNote.pianoKey));
                if (foundNote.pianoKey === seqHistory[seqHistory.length-2].currentNote.pianoKey) {
                    sameProblem = true
                } else {sameProblem = false}
                if (tries==7) break;
                //console.log('Fin While - sameProblem = ' + sameProblem)
            }
            if (tries<=7) {substitutionOccured = true};
            substitutedNote = foundNote;
            return returnResult(substitutedNote, replacedEnharmonism, octaveTransposition, card);
        }
        else { // pas de filtrage
            //console.log('provideBetterChoice - pas de filtrage');
            return returnResult(proposedNote, replacedEnharmonism, octaveTransposition, card);
        }
    }
    else { // pas de filtrage
        //console.log('provideBetterChoice - pas de filtrage parce que pas d'historique');
        //console.log('fin opt - proposedNote.fullName : ' + proposedNote.fullName + " key=  " + proposedNote.pianoKey);
        return returnResult(proposedNote, replacedEnharmonism, octaveTransposition, card);
    }

    function returnResult(nextNote, replEnharmonism, octTransposition, card) {
        //console.log('returnResult : nextNote = ' + nextNote.fullName);
        //console.log(nextNote);
        const retour = {
            currentNote: nextNote, 
            replacedEnharmonism: replEnharmonism, // on renvoi la variable globale
            octaveTransposition : octTransposition, // on renvoi la variable globale
            card: card
        }
        //console.log('retour (currentNote): ' + retour.currentNote.fullName + " key=  " + retour.currentNote.pianoKey);
        if (substitutionOccured) {
            console.log('%c case of repeated note -> substitution occured', "color: HotPink" + 'proposed note : ' + proposedNote.fullName + ' | substitution note : ' + currentNote.fullName);
        }

        return retour;
    }
}


