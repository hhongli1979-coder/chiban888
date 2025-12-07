# BuildingAI 集成指南 | BuildingAI Integration Guide

本文档介绍如何将 SurfSense 与 BuildingAI 项目进行集成。

This document describes how to integrate SurfSense with the BuildingAI project.

---

## 📋 概述 | Overview

[BuildingAI](https://gitee.com/BidingCC/BuildingAI.git) 是一个 AI 构建平台，SurfSense 可以作为其知识库和研究组件进行集成。

[BuildingAI](https://gitee.com/BidingCC/BuildingAI.git) is an AI building platform, and SurfSense can be integrated as its knowledge base and research component.

---

## 🔗 集成方式 | Integration Methods

### 1. API 集成 | API Integration

SurfSense 提供完整的 REST API，可以与 BuildingAI 进行集成：

SurfSense provides a complete REST API that can be integrated with BuildingAI:

#### 主要 API 端点 | Main API Endpoints

- **文档管理 | Document Management**: `/api/documents`
- **搜索查询 | Search Query**: `/api/search`
- **对话接口 | Chat Interface**: `/api/chat`
- **空间管理 | Space Management**: `/api/spaces`

#### 示例代码 | Example Code

```python
import requests

# SurfSense API 基础 URL
SURFSENSE_API_URL = "http://localhost:8000/api"

# 搜索示例
def search_in_surfsense(query: str, space_id: str = None):
    """在 SurfSense 中搜索内容"""
    endpoint = f"{SURFSENSE_API_URL}/search"
    params = {
        "query": query,
        "space_id": space_id
    }
    response = requests.get(endpoint, params=params)
    return response.json()

# 对话示例
def chat_with_surfsense(message: str, space_id: str = None):
    """与 SurfSense 进行对话"""
    endpoint = f"{SURFSENSE_API_URL}/chat"
    data = {
        "message": message,
        "space_id": space_id
    }
    response = requests.post(endpoint, json=data)
    return response.json()
```

### 2. 容器化集成 | Containerized Integration

使用 Docker Compose 将 SurfSense 与 BuildingAI 一起部署：

Use Docker Compose to deploy SurfSense alongside BuildingAI:

```yaml
version: '3.8'

services:
  surfsense_backend:
    image: surfsense/backend:latest
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/surfsense
    depends_on:
      - postgres
      - redis

  surfsense_web:
    image: surfsense/web:latest
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://surfsense_backend:8000
    depends_on:
      - surfsense_backend

  buildingai:
    image: buildingai:latest
    ports:
      - "8080:8080"
    environment:
      - SURFSENSE_API_URL=http://surfsense_backend:8000
    depends_on:
      - surfsense_backend

  postgres:
    image: pgvector/pgvector:pg16
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=surfsense

  redis:
    image: redis:7-alpine
```

### 3. 嵌入式集成 | Embedded Integration

将 SurfSense Web 组件嵌入到 BuildingAI 的前端：

Embed SurfSense Web components into BuildingAI's frontend:

```typescript
// BuildingAI 中集成 SurfSense 组件
import { SurfSenseChat } from '@surfsense/components';

function BuildingAIApp() {
  return (
    <div className="app-container">
      <SurfSenseChat 
        apiUrl="http://localhost:8000"
        spaceId="your-space-id"
        theme="dark"
      />
    </div>
  );
}
```

---

## ⚙️ 配置要求 | Configuration Requirements

### 环境变量 | Environment Variables

在 BuildingAI 项目中添加以下环境变量：

Add the following environment variables to your BuildingAI project:

```bash
# SurfSense API Configuration
SURFSENSE_API_URL=http://localhost:8000
SURFSENSE_API_KEY=your_api_key_here

# SurfSense Features
ENABLE_SURFSENSE_SEARCH=true
ENABLE_SURFSENSE_CHAT=true
ENABLE_SURFSENSE_DOCUMENTS=true
```

### 网络配置 | Network Configuration

确保 BuildingAI 可以访问 SurfSense 的服务端口：

Ensure BuildingAI can access SurfSense service ports:

- Backend API: `8000`
- Web Interface: `3000`
- WebSocket: `8000/ws`

---

## 🚀 快速开始 | Quick Start

### 步骤 1：部署 SurfSense | Step 1: Deploy SurfSense

```bash
# 克隆 SurfSense 仓库
git clone https://github.com/hhongli1979-coder/chiban888.git
cd chiban888

# 使用 Docker Compose 启动
docker-compose up -d
```

### 步骤 2：配置 BuildingAI | Step 2: Configure BuildingAI

在 BuildingAI 的配置文件中添加 SurfSense 连接信息：

Add SurfSense connection information to BuildingAI's configuration file:

```json
{
  "knowledge_base": {
    "provider": "surfsense",
    "api_url": "http://surfsense_backend:8000",
    "api_key": "your_api_key"
  }
}
```

### 步骤 3：验证集成 | Step 3: Verify Integration

```bash
# 测试 API 连接
curl http://localhost:8000/api/health

# 测试搜索功能
curl -X POST http://localhost:8000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "test query"}'
```

---

## 📚 使用场景 | Use Cases

### 1. 知识库增强 | Knowledge Base Enhancement

SurfSense 为 BuildingAI 提供强大的文档管理和检索能力：

SurfSense provides powerful document management and retrieval capabilities for BuildingAI:

- 支持 50+ 种文件格式
- 高级 RAG 技术
- 混合搜索（语义 + 全文）
- 实时索引更新

### 2. AI 研究助手 | AI Research Assistant

将 SurfSense 作为 BuildingAI 的研究组件：

Use SurfSense as BuildingAI's research component:

- 连接外部数据源（GitHub, Slack, Notion 等）
- 生成引用答案
- 创建研究报告
- 播客生成

### 3. 多模态支持 | Multimodal Support

SurfSense 支持多种内容类型：

SurfSense supports various content types:

- 文档处理（PDF, Word, Excel 等）
- 图像分析
- 音频转录
- 视频处理

---

## 🔧 高级配置 | Advanced Configuration

### 自定义认证 | Custom Authentication

如果 BuildingAI 使用自定义认证系统：

If BuildingAI uses a custom authentication system:

```python
# 在 BuildingAI 中配置 SurfSense 认证
from surfsense_client import SurfSenseClient

client = SurfSenseClient(
    api_url="http://localhost:8000",
    auth_token="your_buildingai_token",
    custom_headers={
        "X-BuildingAI-User": "user_id",
        "X-BuildingAI-Tenant": "tenant_id"
    }
)
```

### 性能优化 | Performance Optimization

优化 SurfSense 与 BuildingAI 的集成性能：

Optimize SurfSense and BuildingAI integration performance:

```yaml
# docker-compose.override.yml
services:
  surfsense_backend:
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 8G
        reservations:
          cpus: '2'
          memory: 4G
```

---

## 🔗 相关资源 | Related Resources

- [SurfSense 文档](https://www.surfsense.net/docs/)
- [SurfSense GitHub](https://github.com/hhongli1979-coder/chiban888)
- [BuildingAI 项目](https://gitee.com/BidingCC/BuildingAI.git)
- [Docker 安装指南](https://www.surfsense.net/docs/docker-installation)
- [API 文档](http://localhost:8000/docs)

---

## ❓ 常见问题 | FAQ

### Q: SurfSense 支持哪些 LLM 提供商？
**A:** SurfSense 支持 100+ 种 LLM，包括 OpenAI、Azure、本地 Ollama、DeepSeek、通义千问等。

### Q: 如何在 BuildingAI 中使用 SurfSense 的搜索功能？
**A:** 通过 REST API 调用 `/api/search` 端点，传入查询参数即可获取搜索结果。

### Q: SurfSense 是否支持私有部署？
**A:** 是的，SurfSense 完全支持自托管部署，可以部署在您的私有环境中。

### Q: 如何处理大量文档的索引？
**A:** SurfSense 使用 Celery 异步任务队列处理文档索引，支持大规模文档处理。

---

## 📧 支持与反馈 | Support & Feedback

如有问题或建议，请通过以下方式联系：

For questions or suggestions, please contact us through:

- [SurfSense Discord](https://discord.gg/ejRNvftDp9)
- [GitHub Issues](https://github.com/hhongli1979-coder/chiban888/issues)
- [项目路线图](https://github.com/users/MODSetter/projects/2)

---

*最后更新：2025-12-07*
