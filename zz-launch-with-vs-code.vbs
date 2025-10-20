' Launch index.html, script.js, and style.css in VS Code (trusted window)
Option Explicit

Dim objShell, currentPath, codeExe, cmd

Set objShell = CreateObject("WScript.Shell")

' Get the current folder path (where this script is located)
currentPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Path to VS Code executable (adjust if installed elsewhere)
codeExe = """C:\Users\" & objShell.ExpandEnvironmentStrings("%USERNAME%") & "\AppData\Local\Programs\Microsoft VS Code\Code.exe"""

' Build the command to open files in trusted window
cmd = codeExe & " --new-window --disable-workspace-trust " & _
      " """ & currentPath & "\index.html""" & _
      " """ & currentPath & "\script.js""" & _
      " """ & currentPath & "\style.css"""

' Run the command
objShell.Run cmd, 1, False