# text-freq
Custom functions for Google Sheets that provides textual analysis as JSON.

## Instructions
To use them: 

1. Open a spreadsheet in Google Sheets.
2. Goto Tools -> Script Editor
3. Copy these .gs files into the editor.
4. In your spreadsheet, you can call any of these custom functions:
..* WORD_FREQS_TO_JSON
..* WORD_FREQS_SUM
..* WORD_FREQS_TO_STRING
5. For example, suppose you have some text in cell A1 and an empty cell in B1, then
in cell B1, type:

=WORD_FREQS_TO_JSON(A1)



