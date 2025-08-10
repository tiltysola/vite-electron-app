RequestExecutionLevel admin

!macro customInit
  # 保存安装路径到注册表
  WriteRegStr HKCU "Software\${PRODUCT_NAME}" "InstallLocation" "$INSTDIR"
!macroend

!macro customInstall
  # 从注册表读取安装路径
  ReadRegStr $R0 HKCU "Software\${PRODUCT_NAME}" "InstallLocation"
  StrCmp $R0 "" 0 +2
  StrCpy $R0 "$INSTDIR"
  
  # 写入安装路径到应用程序数据目录
  WriteRegStr HKCU "Software\${PRODUCT_NAME}" "InstallLocation" "$R0"
!macroend