RequestExecutionLevel admin

!macro customInit
  # Save installation path to registry
  WriteRegStr HKCU "Software\${PRODUCT_NAME}" "InstallLocation" "$INSTDIR"
!macroend

!macro customInstall
  # Read installation path from registry
  ReadRegStr $R0 HKCU "Software\${PRODUCT_NAME}" "InstallLocation"
  StrCmp $R0 "" 0 +2
  StrCpy $R0 "$INSTDIR"
  
  # Write installation path to application data directory
  WriteRegStr HKCU "Software\${PRODUCT_NAME}" "InstallLocation" "$R0"
!macroend
