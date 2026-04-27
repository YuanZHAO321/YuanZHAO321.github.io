# 个人主页

中文简介 · [English](README.md)

赵元的个人网站。地球与行星科学本科生，曼彻斯特大学，大二。

**访问：** [yuanzhao321.github.io](https://yuanzhao321.github.io) · [曼大学生主页](https://personalpages.manchester.ac.uk/student/yuan.zhao-8/)

两个地址同步更新，曼大那个可以证明学生身份。

---

## 技术栈

没有构建工具，没有打包器，就是几个文件。

React 和 Babel 从 CDN 加载，不需要 `npm install`。

代价是不能直接双击 `index.html` 打开——浏览器会拦截跨域请求。需要本地服务器：

```bash
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

---

## 文件结构

```
个人主页/
├── index.html          # 入口
├── styles.css          # 所有样式
├── data.jsx            # 内容层，只需要改这个
├── components.jsx      # React 组件
├── app.jsx             # 根组件 + Tweaks 面板
├── tweaks-panel.jsx    # 实时调节面板
├── assets/
│   └── avatar.png
└── writing/
    └── field-2026.html # 独立文章页
```

**改内容只需要动 `data.jsx`**，其他文件基本不用碰。

---

## 内容结构

`data.jsx` 里的几个对象：

```js
PROFILE      // 基本信息、链接
TYPED_LINES  // Hero 区打字机效果的滚动文字
SKILLS       // 三列技能，每项 [英文名, 中文名, 熟练度 1–4]
PROJECTS     // 项目卡片，点击展开详情
EXPERIENCE   // 经历条目
WRITING      // 文章列表
LINKS        // 联系方式
```

---

## 设计说明

- **字体：** Fraunces（标题）· JetBrains Mono（等宽）· Noto Serif SC（中文）
- **配色：** 暖米色底 `#f6f3ec`，赭石主题色 `#a85a2a`，支持深色模式
- **交互：** 自定义光标、滚动触发渐入、Hero 区打字机效果
- **右下角 Tweaks 面板：** 可以实时切换深色模式、主题色、字体风格、布局密度

---

## 文章页

`writing/` 里的文章是独立的 HTML 文件，和主页共用字体和颜色系统，但不依赖 React——直接用静态 HTML 写的，阅读体验优先。

添加新文章：

1. 复制 `writing/field-2026.html`，替换正文内容
2. 在 `data.jsx` 的 `WRITING` 数组里加一条：

```js
{
  date: "2026 · 09",
  title_en: "Title",
  title_cn: "标题",
  subtitle_en: "副标题（可选）",
  url: "writing/your-file.html",
}
```

---

*Built in Manchester.*
