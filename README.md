# Haida's blog

我的个人博客，使用 Astro 构建，在 [Arthal Ink](https://github.com/zhuozhiyongde/Arthals-Ink)的基础上大幅修改，所使用模版为 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure)。

Shout out to 两位模板作者，@cworld1 和 @zhuozhiyongde。

欢迎访问 [Haida 的个人博客](https://mariverse.github.io)！

## 本地开发

使用 Node.js 24，以及 `package.json` 中固定的 pnpm 版本：

```sh
pnpm install --frozen-lockfile
pnpm dev                       # 开发预览
pnpm build && pnpm preview     # 类型检查、静态构建，并预览真实的搜索索引和 RSS
```

GitHub Pages 使用同一份锁文件和 `pnpm build`。升级主题时，先检查 `astro-pure` 指定的 Astro 版本，再一起测试 MDX、UnoCSS、Pagefind 与 RSS。`@unocss/reset` 由生成的虚拟模块直接从项目根目录导入，需要保留。`pnpm-workspace.yaml` 只对 Astro 6 的图像服务指定了修复后的 Sharp；更换 Astro 主版本时应重新评估这一项。

## 📜 License

所有博客文本内容以 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议发布。
