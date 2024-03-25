declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"Architecture/Build/SourceMap.md": {
	id: "Architecture/Build/SourceMap.md";
  slug: "architecture/build/sourcemap";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Architecture/MicroFE/微前端.md": {
	id: "Architecture/MicroFE/微前端.md";
  slug: "architecture/microfe/微前端";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Architecture/Monorepo/Lerna.md": {
	id: "Architecture/Monorepo/Lerna.md";
  slug: "architecture/monorepo/lerna";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Architecture/SPA VS MPA.md": {
	id: "Architecture/SPA VS MPA.md";
  slug: "architecture/spa-vs-mpa";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Architecture/Separation/前后端分离.md": {
	id: "Architecture/Separation/前后端分离.md";
  slug: "architecture/separation/前后端分离";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Architecture/权限设计.md": {
	id: "Architecture/权限设计.md";
  slug: "architecture/权限设计";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Architecture/架构.md": {
	id: "Architecture/架构.md";
  slug: "architecture/架构";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Algorithm/DP/经典扔鸡蛋.md": {
	id: "CS/Algorithm/DP/经典扔鸡蛋.md";
  slug: "cs/algorithm/dp/经典扔鸡蛋";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Algorithm/DP/股票算法.md": {
	id: "CS/Algorithm/DP/股票算法.md";
  slug: "cs/algorithm/dp/股票算法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Algorithm/树形常用算法.md": {
	id: "CS/Algorithm/树形常用算法.md";
  slug: "cs/algorithm/树形常用算法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Algorithm/线形常用算法.md": {
	id: "CS/Algorithm/线形常用算法.md";
  slug: "cs/algorithm/线形常用算法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/Linear/线形.md": {
	id: "CS/Database/Linear/线形.md";
  slug: "cs/database/linear/线形";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/Map/图形.md": {
	id: "CS/Database/Map/图形.md";
  slug: "cs/database/map/图形";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/Tree/单词查找树.md": {
	id: "CS/Database/Tree/单词查找树.md";
  slug: "cs/database/tree/单词查找树";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/Tree/堆.md": {
	id: "CS/Database/Tree/堆.md";
  slug: "cs/database/tree/堆";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/Tree/并查集.md": {
	id: "CS/Database/Tree/并查集.md";
  slug: "cs/database/tree/并查集";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/Tree/构建树.md": {
	id: "CS/Database/Tree/构建树.md";
  slug: "cs/database/tree/构建树";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/Tree/树形.md": {
	id: "CS/Database/Tree/树形.md";
  slug: "cs/database/tree/树形";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Database/数学.md": {
	id: "CS/Database/数学.md";
  slug: "cs/database/数学";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Docker/Docker.md": {
	id: "CS/Docker/Docker.md";
  slug: "cs/docker/docker";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Encoding/BOM.md": {
	id: "CS/Encoding/BOM.md";
  slug: "cs/encoding/bom";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/Encoding/Unicode.md": {
	id: "CS/Encoding/Unicode.md";
  slug: "cs/encoding/unicode";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/NetWork/Application/GRPC/GRPC.md": {
	id: "CS/NetWork/Application/GRPC/GRPC.md";
  slug: "cs/network/application/grpc/grpc";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/NetWork/Application/HTTP/HTTP.md": {
	id: "CS/NetWork/Application/HTTP/HTTP.md";
  slug: "cs/network/application/http/http";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/NetWork/Application/HTTP/RESTful API.md": {
	id: "CS/NetWork/Application/HTTP/RESTful API.md";
  slug: "cs/network/application/http/restful-api";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/NetWork/Application/HTTP/URI、URL、URN、Data URI、Object URL.md": {
	id: "CS/NetWork/Application/HTTP/URI、URL、URN、Data URI、Object URL.md";
  slug: "cs/network/application/http/uriurlurndata-uriobject-url";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/OS/Linux.md": {
	id: "CS/OS/Linux.md";
  slug: "cs/os/linux";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CS/OS/OS.md": {
	id: "CS/OS/OS.md";
  slug: "cs/os/os";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"CSS/CSS.md": {
	id: "CSS/CSS.md";
  slug: "css/css";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"DB/MongoDB/API.md": {
	id: "DB/MongoDB/API.md";
  slug: "db/mongodb/api";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"DB/MongoDB/MongoDB.md": {
	id: "DB/MongoDB/MongoDB.md";
  slug: "db/mongodb/mongodb";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"DB/MongoDB/权限.md": {
	id: "DB/MongoDB/权限.md";
  slug: "db/mongodb/权限";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"DB/MongoDB/索引.md": {
	id: "DB/MongoDB/索引.md";
  slug: "db/mongodb/索引";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"FAQ/Chrome调试.md": {
	id: "FAQ/Chrome调试.md";
  slug: "faq/chrome调试";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"FAQ/JS如何获取精确的时间戳.md": {
	id: "FAQ/JS如何获取精确的时间戳.md";
  slug: "faq/js如何获取精确的时间戳";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"FAQ/node.js内存泄漏.md": {
	id: "FAQ/node.js内存泄漏.md";
  slug: "faq/nodejs内存泄漏";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"FAQ/内存泄漏及排查.md": {
	id: "FAQ/内存泄漏及排查.md";
  slug: "faq/内存泄漏及排查";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"FAQ/常见的问题及解决方案.md": {
	id: "FAQ/常见的问题及解决方案.md";
  slug: "faq/常见的问题及解决方案";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"FAQ/开源如何保证收入.md": {
	id: "FAQ/开源如何保证收入.md";
  slug: "faq/开源如何保证收入";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"FAQ/网页如何唤醒本地程序.md": {
	id: "FAQ/网页如何唤醒本地程序.md";
  slug: "faq/网页如何唤醒本地程序";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Graphics/图形学.md": {
	id: "Graphics/图形学.md";
  slug: "graphics/图形学";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"HTML/HTML.md": {
	id: "HTML/HTML.md";
  slug: "html/html";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Home.md": {
	id: "Home.md";
  slug: "home";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Function.md": {
	id: "Javascript/Function.md";
  slug: "javascript/function";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Number/Number.md": {
	id: "Javascript/Number/Number.md";
  slug: "javascript/number/number";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Number/javascript浮点数.md": {
	id: "Javascript/Number/javascript浮点数.md";
  slug: "javascript/number/javascript浮点数";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Object/Array.md": {
	id: "Javascript/Object/Array.md";
  slug: "javascript/object/array";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Object/Javascript.md": {
	id: "Javascript/Object/Javascript.md";
  slug: "javascript/object/javascript";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Object/Javascript面向对象.md": {
	id: "Javascript/Object/Javascript面向对象.md";
  slug: "javascript/object/javascript面向对象";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Object/Javscript 属性、方法.md": {
	id: "Javascript/Object/Javscript 属性、方法.md";
  slug: "javascript/object/javscript-属性方法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Object/RegExp.md": {
	id: "Javascript/Object/RegExp.md";
  slug: "javascript/object/regexp";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Object/This.md": {
	id: "Javascript/Object/This.md";
  slug: "javascript/object/this";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/Promise.md": {
	id: "Javascript/Promise.md";
  slug: "javascript/promise";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/作用域.md": {
	id: "Javascript/作用域.md";
  slug: "javascript/作用域";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Javascript/执行上下文.md": {
	id: "Javascript/执行上下文.md";
  slug: "javascript/执行上下文";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/Error.md": {
	id: "Node.js/API/Error.md";
  slug: "nodejs/api/error";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/Module.md": {
	id: "Node.js/API/Module.md";
  slug: "nodejs/api/module";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/buffer.md": {
	id: "Node.js/API/buffer.md";
  slug: "nodejs/api/buffer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/child_process.md": {
	id: "Node.js/API/child_process.md";
  slug: "nodejs/api/child_process";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/cluster.md": {
	id: "Node.js/API/cluster.md";
  slug: "nodejs/api/cluster";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/console.md": {
	id: "Node.js/API/console.md";
  slug: "nodejs/api/console";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/process.md": {
	id: "Node.js/API/process.md";
  slug: "nodejs/api/process";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/string_decoder.md": {
	id: "Node.js/API/string_decoder.md";
  slug: "nodejs/api/string_decoder";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/API/timer.md": {
	id: "Node.js/API/timer.md";
  slug: "nodejs/api/timer";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/CommonJS.md": {
	id: "Node.js/CommonJS.md";
  slug: "nodejs/commonjs";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Deploy/node使用docker部署.md": {
	id: "Node.js/Deploy/node使用docker部署.md";
  slug: "nodejs/deploy/node使用docker部署";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Framework/Egg.md": {
	id: "Node.js/Framework/Egg.md";
  slug: "nodejs/framework/egg";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Node.js 特性.md": {
	id: "Node.js/Node.js 特性.md";
  slug: "nodejs/nodejs-特性";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Packages/NPM.md": {
	id: "Node.js/Packages/NPM.md";
  slug: "nodejs/packages/npm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Packages/PNPM.md": {
	id: "Node.js/Packages/PNPM.md";
  slug: "nodejs/packages/pnpm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Packages/Yarn.md": {
	id: "Node.js/Packages/Yarn.md";
  slug: "nodejs/packages/yarn";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Packages/npm和yarn的区别.md": {
	id: "Node.js/Packages/npm和yarn的区别.md";
  slug: "nodejs/packages/npm和yarn的区别";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Packages/package.json.md": {
	id: "Node.js/Packages/package.json.md";
  slug: "nodejs/packages/packagejson";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Node.js/Packages/包管理.md": {
	id: "Node.js/Packages/包管理.md";
  slug: "nodejs/packages/包管理";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"React/API.md": {
	id: "React/API.md";
  slug: "react/api";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"React/Headless UI 和 React Hooks.md": {
	id: "React/Headless UI 和 React Hooks.md";
  slug: "react/headless-ui-和-react-hooks";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/Base64编码.md": {
	id: "ToBeContinue/Base64编码.md";
  slug: "tobecontinue/base64编码";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/CJS, ESM, Webpack.md": {
	id: "ToBeContinue/CJS, ESM, Webpack.md";
  slug: "tobecontinue/cjs-esm-webpack";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/Heap.md": {
	id: "ToBeContinue/Heap.md";
  slug: "tobecontinue/heap";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/Import maps.md": {
	id: "ToBeContinue/Import maps.md";
  slug: "tobecontinue/import-maps";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/JSON和Javascript.md": {
	id: "ToBeContinue/JSON和Javascript.md";
  slug: "tobecontinue/json和javascript";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/Javascript正则.md": {
	id: "ToBeContinue/Javascript正则.md";
  slug: "tobecontinue/javascript正则";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/React 事件.md": {
	id: "ToBeContinue/React 事件.md";
  slug: "tobecontinue/react-事件";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/React 的错误捕获.md": {
	id: "ToBeContinue/React 的错误捕获.md";
  slug: "tobecontinue/react-的错误捕获";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/为啥react没有keep-alive.md": {
	id: "ToBeContinue/为啥react没有keep-alive.md";
  slug: "tobecontinue/为啥react没有keep-alive";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/二分法.md": {
	id: "ToBeContinue/二分法.md";
  slug: "tobecontinue/二分法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/从d.ts了解typescript.md": {
	id: "ToBeContinue/从d.ts了解typescript.md";
  slug: "tobecontinue/从dts了解typescript";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/前后端实时通信.md": {
	id: "ToBeContinue/前后端实时通信.md";
  slug: "tobecontinue/前后端实时通信";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/单调栈.md": {
	id: "ToBeContinue/单调栈.md";
  slug: "tobecontinue/单调栈";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/博弈算法.md": {
	id: "ToBeContinue/博弈算法.md";
  slug: "tobecontinue/博弈算法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/多米诺和托米诺平铺.md": {
	id: "ToBeContinue/多米诺和托米诺平铺.md";
  slug: "tobecontinue/多米诺和托米诺平铺";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/大文件如何上传.md": {
	id: "ToBeContinue/大文件如何上传.md";
  slug: "tobecontinue/大文件如何上传";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/子序列问题.md": {
	id: "ToBeContinue/子序列问题.md";
  slug: "tobecontinue/子序列问题";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/寻找中位数.md": {
	id: "ToBeContinue/寻找中位数.md";
  slug: "tobecontinue/寻找中位数";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/时区.md": {
	id: "ToBeContinue/时区.md";
  slug: "tobecontinue/时区";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/树状数组.md": {
	id: "ToBeContinue/树状数组.md";
  slug: "tobecontinue/树状数组";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/格雷码.md": {
	id: "ToBeContinue/格雷码.md";
  slug: "tobecontinue/格雷码";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/直播流.md": {
	id: "ToBeContinue/直播流.md";
  slug: "tobecontinue/直播流";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/贡献度算法.md": {
	id: "ToBeContinue/贡献度算法.md";
  slug: "tobecontinue/贡献度算法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/进制转换.md": {
	id: "ToBeContinue/进制转换.md";
  slug: "tobecontinue/进制转换";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"ToBeContinue/随机算法.md": {
	id: "ToBeContinue/随机算法.md";
  slug: "tobecontinue/随机算法";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Tutorial/从egg-helper学习egg源码.md": {
	id: "Tutorial/从egg-helper学习egg源码.md";
  slug: "tutorial/从egg-helper学习egg源码";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Tutorial/我的大前端世界观.md": {
	id: "Tutorial/我的大前端世界观.md";
  slug: "tutorial/我的大前端世界观";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Tutorial/面试复习.md": {
	id: "Tutorial/面试复习.md";
  slug: "tutorial/面试复习";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Typescript/Typescript.md": {
	id: "Typescript/Typescript.md";
  slug: "typescript/typescript";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Typescript/类型.md": {
	id: "Typescript/类型.md";
  slug: "typescript/类型";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Utils/Git/Git hooks husky lint-staged.md": {
	id: "Utils/Git/Git hooks husky lint-staged.md";
  slug: "utils/git/git-hooks-husky-lint-staged";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Utils/Git/Git原理.md": {
	id: "Utils/Git/Git原理.md";
  slug: "utils/git/git原理";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Utils/Git/Git命令.md": {
	id: "Utils/Git/Git命令.md";
  slug: "utils/git/git命令";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Utils/Git/Git工作流.md": {
	id: "Utils/Git/Git工作流.md";
  slug: "utils/git/git工作流";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Utils/Playwright/Playwright.md": {
	id: "Utils/Playwright/Playwright.md";
  slug: "utils/playwright/playwright";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Utils/Puppetter/Puppetter优化.md": {
	id: "Utils/Puppetter/Puppetter优化.md";
  slug: "utils/puppetter/puppetter优化";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Vue/Vue Router.md": {
	id: "Vue/Vue Router.md";
  slug: "vue/vue-router";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Vue/响应式系统.md": {
	id: "Vue/响应式系统.md";
  slug: "vue/响应式系统";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"Vue/组件.md": {
	id: "Vue/组件.md";
  slug: "vue/组件";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"跨平台/Electron/Electron 优化.md": {
	id: "跨平台/Electron/Electron 优化.md";
  slug: "跨平台/electron/electron-优化";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
