mkdir .\db
del .\db\readPdf.db
.\sql\sqlite3.exe .\db\readPdf.db < .\sql\SLIP.sql
