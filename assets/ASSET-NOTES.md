# chenglian 视觉素材说明

## 具体型号产品图片

当前目录共 41 款具体型号：服务器 10 款、交换机 14 款、服务器硬盘 8 款、硬件配件 9 款。产品图片来自厂商产品页、官方数据表或官方产品简报，不使用 AI 生成图或通用 SVG 作为具体型号的产品图片。

- 原始厂商图片保存在 `assets/products/`；部分图片从官方 PDF 中提取。
- 网站优化图保存在 `assets/products/web/`，由 `optimize-product-images.cjs` 生成 WebP，仅裁去空白边缘、缩放及压缩，保留原图。映射记录在 `research/web-images.json`。
- 型号、图片和资料来源维护于 `research/servers.json`、`research/switches.json`、`research/storage-accessories.json`、`research/network-accessories.json`。`imageSource` 为图片来源，`sourceUrl` 为规格资料来源；同时保留 `verifiedAt`、`imageScope`、`imageNote`。
- `imageScope: "model"` 表示对应型号的厂商图；`imageScope: "series"` 表示厂商共用的系列图。系列图已在页面明确标注，完整料号、容量、接口和配置以文字参数及选型确认为准。例如部分硬盘使用同系列容量共用图，Kingston Server Premier 内存使用官方系列合照。
- `compile-products.cjs` 合并四份型号数据，生成网站使用的 `product-data.js` 和来源汇总 `research/catalog-sources.json`，并保留详细原始图片备注于 `provenanceNote`。
- `build.cjs` 仅按当前产品数据引用复制所需产品图片到 `dist`。产品资料更新后依次执行 `node optimize-product-images.cjs`、`node compile-products.cjs`、`node build.cjs`，随后运行 `qa/models-qa.cjs` 检查全部型号详情、图片加载及发布资源一致性。

厂商来源可追溯不等于获得图片使用授权。正式发布前由企业核对厂商图片的使用条件；这里不声明代理授权、库存或供货承诺。

## 首页概念场景

- 最终文件：`D:/pixal-3d/electronics-showcase/assets/network-hero.png`
- 发布副本：`D:/pixal-3d/electronics-showcase/dist/assets/network-hero.png`
- 方式：内置 image_gen 工具，非 CLI。
- 用途：网络设备类型的品牌氛围图，不代表实际出售的某一产品型号或规格。
- 原始图保留在 Codex 的 generated_images 目录。项目引用本地工作区副本。

最终生成提示词：

> Use case: product-mockup. Asset type: wide 3:2 cinematic hero background for chenglian enterprise network equipment website. Primary request: ultra-realistic premium studio photograph showing unbranded enterprise server and networking hardware. A dark graphite 2U rackmount server with precisely arranged hot-swap bays on the lower foreground right, a 48-port ethernet network switch stacked slightly above and behind, two SFP optical transceiver modules and a neatly looped black DAC cable on the dark tabletop. One tall data-center rack partly visible far right background, soft defocused deep darkness. Detailed functional industrial product geometry, real-looking metal brushed anodized black surfaces, tiny subtle blue and green link-status LEDs. Three-quarter perspective looking slightly down. Composition: cluster of horizontal server and switch fills right 70 percent, left 30 percent almost empty dark charcoal negative space, equipment subtly recedes. Dramatic but controlled cool blue edge light from rear right, soft neutral key light revealing the ports and mesh, sophisticated black-on-black photographic technology campaign. Black navy background #090c12 seamless with the ground; gentle natural shadows. Photoreal, not diagram, no glowing rings or abstract floating shapes. No people, no logos, no letters, no text, no watermark. Landscape image.

## 其他素材

- `network-server.svg`、`network-switch.svg`、`network-optic.svg`、`network-accessory.svg`：首轮改版保留的可编辑设备结构示意图，已被厂商产品图片替代，不再用于当前型号目录，也不由当前构建流程复制到发布目录。
- `favicon.svg`：chenglian 的几何字母符号。
- `technology.jpg`：沿用旧项目的电路板摄影。旧项目注明来自 Unsplash，正式使用应核对原授权记录。
- `lucide.min.js`：沿用旧项目的本地图标库。
- The bundled Lucide library identifies itself as version 0.468.0. Its full ISC license is preserved in `LUCIDE-LICENSE.txt` and copied to the published assets. License source: https://raw.githubusercontent.com/lucide-icons/lucide/0.468.0/LICENSE.

旧消费电子摄影不再用于新版页面。用户澄清主营网络设备前生成的消费电子场景未纳入网站。

## Locally hosted typography

The site uses IBM Plex Sans (Regular, Medium and SemiBold) for interface and editorial text, and IBM Plex Mono for model numbers and technical identifiers. Fonts are hosted in `assets/fonts/` and loaded by `typography.css`; no third-party font request is required.

Source: https://github.com/IBM/plex/tree/master/packages (official IBM Plex repository). Original WOFF2 files are unchanged. The SIL Open Font License and copyright notice are bundled in `assets/fonts/OFL.txt` and included in `dist`.
