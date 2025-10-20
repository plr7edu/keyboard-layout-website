' Chrome Web App Silent Launcher
' Launches index.html as a Chrome app window with taskbar icon and maximized

Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get the current script directory
strScriptPath = objShell.CurrentDirectory
strHtmlFile = objFSO.BuildPath(strScriptPath, "index.html")
strIconFile = objFSO.BuildPath(strScriptPath, "icon\keyboard.ico")

' Verify files exist
If Not objFSO.FileExists(strHtmlFile) Then
    WScript.Echo "Error: index.html not found in " & strScriptPath
    WScript.Quit 1
End If

If Not objFSO.FileExists(strIconFile) Then
    WScript.Echo "Error: icon.ico not found in " & strScriptPath & "\icon\"
    WScript.Quit 1
End If

' Convert to absolute file URL
strFileUrl = "file:///" & Replace(strHtmlFile, "\", "/")

' Chrome command with app mode, custom icon, and maximized window
strChromeExe = "chrome.exe"
strCommand = strChromeExe & " --app=""" & strFileUrl & """ --icon=""" & strIconFile & """ --start-maximized"

' Execute silently (no window) with window style 0
objShell.Run strCommand, 0, False