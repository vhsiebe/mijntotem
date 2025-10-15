-- Open the document
set documentPath to "Macintosh HD:Gebruikers:svanderhenst:Documenten:prive:mijntotem.be:public:totems:total.afpub"
tell application "Finder" to open document file documentPath

-- Wait for Affinity Publisher to become active
tell application "System Events"
    tell process "Affinity Publisher 2"
        repeat until exists window 1
            delay 1
        end repeat
        set mainWindow to window 1
    end tell
end tell

-- Activate Data Merge dialog box
tell application "System Events"
    tell process "Affinity Publisher 2"
        click menu item "Data Merge Manager…" of menu 1 of menu bar item "Window" of menu bar 1
    end tell
end tell

delay 1

set mouseLocation to {526, 128}
tell application "System Events" to click at the mouseLocation

set mouseLocation to {620, 620}
tell application "System Events" to click at the mouseLocation

delay 20

set mouseLocation to {700, 620}
tell application "System Events" to click at the mouseLocation


tell application "System Events"
    tell process "Affinity Publisher 2"
        click menu item "Export…" of menu 1 of menu bar item "File" of menu bar 1
    end tell
end tell

delay 2

set mouseLocation to {1200, 760}
tell application "System Events" to click at the mouseLocation

tell application "System Events"
    tell process "Affinity Publisher 2"
        delay 1
        keystroke "total.pdf" -- Type the file name
        delay 1
        keystroke "g" using {command down, shift down} -- Open 'Go to folder' dialog
        delay 1
        keystroke "/Users/svanderhenst/Documents/prive/mijntotem.be/automation/" -- Go to the home directory
        delay 1
        keystroke return -- Confirm the dialog
        delay 1
        keystroke return -- Confirm the dialog
        delay 1
    end tell
end tell


delay 60