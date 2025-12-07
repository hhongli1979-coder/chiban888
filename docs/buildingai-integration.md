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
  # PostgreSQL with pgvector extension
  db:
    image: ankane/pgvector:latest
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=surfsense
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis for Celery
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # SurfSense Backend
  backend:
    build: ./surfsense_backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/surfsense
      - CELERY_BROKER_URL=redis://redis:6379/0
      - CELERY_RESULT_BACKEND=redis://redis:6379/0
    depends_on:
      - db
      - redis

  # SurfSense Frontend
  frontend:
    build:
      context: ./surfsense_web
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_FASTAPI_BACKEND_URL=http://backend:8000
    depends_on:
      - backend

  # BuildingAI Service
  buildingai:
    image: buildingai:latest
    ports:
      - "8080:8080"
    environment:
      - SURFSENSE_API_URL=http://backend:8000
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

### 3. 嵌入式集成 | Embedded Integration

将 SurfSense 作为 iframe 嵌入到 BuildingAI 的前端，或通过 API 直接调用：

Embed SurfSense as an iframe in BuildingAI's frontend, or call it directly via API:

#### 方法 A：iframe 嵌入 | Method A: iframe Embedding

```html
<!-- BuildingAI 中嵌入 SurfSense 界面 -->
<iframe 
  src="http://localhost:3000/chat?space_id=your-space-id"
  width="100%" 
  height="600px"
  style="border: 1px solid #ddd; border-radius: 8px;"
></iframe>
```

#### 方法 B：API 直接集成 | Method B: Direct API Integration

```typescript
// BuildingAI 中集成 SurfSense API
import axios from 'axios';

const SURFSENSE_API = 'http://localhost:8000/api';

async function searchSurfSense(query: string) {
  const response = await axios.get(`${SURFSENSE_API}/search`, {
    params: { query }
  });
  return response.data;
}

async function chatWithSurfSense(message: string, spaceId?: string) {
  const response = await axios.post(`${SURFSENSE_API}/chat`, {
    message,
    space_id: spaceId
  });
  return response.data;
}

// 在 BuildingAI 应用中使用
function BuildingAIApp() {
  const handleSearch = async (query: string) => {
    const results = await searchSurfSense(query);
    console.log('Search results:', results);
  };
  
  const handleChat = async (message: string) => {
    const response = await chatWithSurfSense(message);
    console.log('Chat response:', response);
  };
  
  return (
    <div className="app-container">
      <h1>BuildingAI with SurfSense</h1>
      {/* Your BuildingAI UI */}
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

如果 BuildingAI 使用自定义认证系统，可以通过请求头传递认证信息：

If BuildingAI uses a custom authentication system, you can pass authentication via headers:

```python
# 在 BuildingAI 中配置 SurfSense 认证
import requests

class SurfSenseClient:
    def __init__(self, api_url: str, auth_token: str, custom_headers: dict = None):
        self.api_url = api_url
        self.headers = {
            'Authorization': f'Bearer {auth_token}',
            **(custom_headers or {})
        }
    
    def search(self, query: str, space_id: str = None):
        """在 SurfSense 中搜索"""
        response = requests.get(
            f"{self.api_url}/api/search",
            params={"query": query, "space_id": space_id},
            headers=self.headers
        )
        return response.json()
    
    def chat(self, message: str, space_id: str = None):
        """与 SurfSense 对话"""
        response = requests.post(
            f"{self.api_url}/api/chat",
            json={"message": message, "space_id": space_id},
            headers=self.headers
        )
        return response.json()

# 使用示例
client = SurfSenseClient(
    api_url="http://localhost:8000",
    auth_token="your_buildingai_token",
    custom_headers={
        "X-BuildingAI-User": "user_id",
        "X-BuildingAI-Tenant": "tenant_id"
    }
)

# 执行搜索
results = client.search("machine learning")
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
