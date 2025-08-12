# React Router DOM 获取 Search 参数指南

## 主要方法

### 1. useSearchParams Hook (推荐)

```tsx
import { useSearchParams } from 'react-router-dom';

const MyComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 获取参数
  const id = searchParams.get('id');
  const tags = searchParams.getAll('tag');

  // 更新参数
  const updateParams = () => {
    setSearchParams({ id: '123', name: 'test' });
  };

  return <div>ID: {id}</div>;
};
```

### 2. useLocation Hook

```tsx
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get('id');
  const stateData = location.state;

  return <div>ID: {id}</div>;
};
```

### 3. 原生 JavaScript

```tsx
const MyComponent = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  return <div>ID: {id}</div>;
};
```

## 实际应用

- **分页**: 使用 `page` 和 `size` 参数
- **搜索**: 使用 `q` 参数存储搜索关键词
- **筛选**: 使用 `category`、`status` 等参数
- **排序**: 使用 `sort` 和 `order` 参数

## 最佳实践

1. 优先使用 `useSearchParams` Hook
2. 参数变化时组件会自动重新渲染
3. 支持获取、设置、删除参数
4. 提供完整的 TypeScript 支持
