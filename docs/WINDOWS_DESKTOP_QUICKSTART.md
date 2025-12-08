# SurfSense Windows 桌面应用快速开始指南

[English](#surfsense-windows-desktop-application-quick-start-guide) | [中文](#surfsense-windows-桌面应用快速开始指南)

---

## SurfSense Windows 桌面应用快速开始指南

### 简介

SurfSense Windows 桌面应用程序是一个原生的 Windows 应用，为您提供更好的桌面体验。

### 功能特点

- ✨ 原生 Windows 体验
- 🎯 系统托盘集成
- 📴 离线功能支持
- 🔔 桌面通知
- ⚡ 快速启动和响应
- 🖥️ 独立窗口管理

### 系统要求

- Windows 10 或更高版本（64位）
- 4GB RAM（推荐 8GB）
- 500MB 可用磁盘空间
- 网络连接（用于同步和 AI 功能）

### 安装步骤

#### 方式一：使用安装程序（推荐）

1. 下载 `SurfSense-1.0.0-x64.exe`
2. 双击运行安装程序
3. 按照向导完成安装
4. 安装完成后，从桌面快捷方式或开始菜单启动 SurfSense

#### 方式二：使用便携版

1. 下载 `SurfSense-1.0.0-portable.exe`
2. 将文件移动到您想要的位置
3. 双击运行，无需安装

### 首次使用

1. **启动应用**
   - 从桌面快捷方式或开始菜单打开 SurfSense
   - 应用将出现在系统托盘中

2. **登录账户**
   - 使用您的 SurfSense 账户登录
   - 或创建新账户

3. **配置后端**
   - 如果您是自托管用户，需要配置后端服务器地址
   - 默认地址：`http://localhost:8000`

### 使用技巧

#### 系统托盘

应用最小化到系统托盘后：
- **单击托盘图标**：显示/隐藏主窗口
- **右键托盘图标**：打开菜单
  - 显示 SurfSense
  - 退出

#### 快捷键

- `Ctrl + N`: 新建研究
- `Ctrl + S`: 保存当前工作
- `Ctrl + F`: 搜索
- `Ctrl + ,`: 打开设置

#### 关闭应用

点击窗口的关闭按钮（X）会将应用最小化到系统托盘，而不是完全退出。

要完全退出应用：
- 右键点击系统托盘图标，选择"退出"
- 或使用菜单栏：文件 → 退出

### 常见问题

#### 应用无法启动

1. 确保您的 Windows 版本是 64 位
2. 检查是否有杀毒软件阻止
3. 以管理员身份运行

#### 无法连接到后端

1. 确保后端服务正在运行
2. 检查防火墙设置
3. 验证后端地址配置是否正确

#### 更新应用

应用会自动检查更新。当有新版本时：
1. 会收到通知
2. 点击"立即更新"
3. 应用将自动下载并安装更新

### 开发者选项

如果您想从源代码构建或开发：

```bash
# 克隆仓库
git clone https://github.com/hhongli1979-coder/chiban888.git
cd chiban888/surfsense_desktop

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建 Windows 应用
npm run build
```

详细信息请参阅 [surfsense_desktop/README.md](../surfsense_desktop/README.md)

### 获取帮助

- 📖 [完整文档](https://www.surfsense.net/docs/)
- 💬 [Discord 社区](https://discord.gg/ejRNvftDp9)
- 🐛 [报告问题](https://github.com/MODSetter/SurfSense/issues)

---

## SurfSense Windows Desktop Application Quick Start Guide

### Introduction

The SurfSense Windows desktop application is a native Windows app that provides a better desktop experience.

### Features

- ✨ Native Windows experience
- 🎯 System tray integration
- 📴 Offline capabilities
- 🔔 Desktop notifications
- ⚡ Fast startup and response
- 🖥️ Independent window management

### System Requirements

- Windows 10 or higher (64-bit)
- 4GB RAM (8GB recommended)
- 500MB available disk space
- Internet connection (for sync and AI features)

### Installation Steps

#### Method 1: Using the Installer (Recommended)

1. Download `SurfSense-1.0.0-x64.exe`
2. Double-click to run the installer
3. Follow the wizard to complete installation
4. After installation, launch SurfSense from the desktop shortcut or Start menu

#### Method 2: Using the Portable Version

1. Download `SurfSense-1.0.0-portable.exe`
2. Move the file to your desired location
3. Double-click to run, no installation needed

### First Time Use

1. **Launch the App**
   - Open SurfSense from desktop shortcut or Start menu
   - The app will appear in the system tray

2. **Login to Account**
   - Login with your SurfSense account
   - Or create a new account

3. **Configure Backend**
   - If you're self-hosting, configure the backend server address
   - Default address: `http://localhost:8000`

### Usage Tips

#### System Tray

After minimizing to system tray:
- **Click tray icon**: Show/hide main window
- **Right-click tray icon**: Open menu
  - Show SurfSense
  - Quit

#### Keyboard Shortcuts

- `Ctrl + N`: New research
- `Ctrl + S`: Save current work
- `Ctrl + F`: Search
- `Ctrl + ,`: Open settings

#### Closing the App

Clicking the close button (X) minimizes the app to system tray instead of quitting.

To fully quit the application:
- Right-click the tray icon and select "Quit"
- Or use menu bar: File → Quit

### Troubleshooting

#### App Won't Start

1. Ensure your Windows version is 64-bit
2. Check if antivirus is blocking
3. Run as administrator

#### Cannot Connect to Backend

1. Ensure backend service is running
2. Check firewall settings
3. Verify backend address configuration

#### Updating the App

The app automatically checks for updates. When a new version is available:
1. You'll receive a notification
2. Click "Update Now"
3. The app will automatically download and install the update

### Developer Options

If you want to build from source or develop:

```bash
# Clone repository
git clone https://github.com/hhongli1979-coder/chiban888.git
cd chiban888/surfsense_desktop

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build Windows application
npm run build
```

For detailed information, see [surfsense_desktop/README.md](../surfsense_desktop/README.md)

### Getting Help

- 📖 [Full Documentation](https://www.surfsense.net/docs/)
- 💬 [Discord Community](https://discord.gg/ejRNvftDp9)
- 🐛 [Report Issues](https://github.com/MODSetter/SurfSense/issues)
