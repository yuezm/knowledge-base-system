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
  data: any
} & { render(): Render[".md"] };
"Architecture/MicroFE/微前端.md": {
	id: "Architecture/MicroFE/微前端.md";
  slug: "architecture/microfe/微前端";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Architecture/Monorepo/Lerna.md": {
	id: "Architecture/Monorepo/Lerna.md";
  slug: "architecture/monorepo/lerna";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Architecture/SPA VS MPA.md": {
	id: "Architecture/SPA VS MPA.md";
  slug: "architecture/spa-vs-mpa";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Architecture/Separation/前后端分离.md": {
	id: "Architecture/Separation/前后端分离.md";
  slug: "architecture/separation/前后端分离";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Architecture/权限设计.md": {
	id: "Architecture/权限设计.md";
  slug: "architecture/权限设计";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Architecture/架构.md": {
	id: "Architecture/架构.md";
  slug: "architecture/架构";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Browser/Performance.md": {
	id: "Browser/Performance.md";
  slug: "browser/performance";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Browser/浏览器指纹.md": {
	id: "Browser/浏览器指纹.md";
  slug: "browser/浏览器指纹";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Algorithm/DP/经典扔鸡蛋.md": {
	id: "CS/Algorithm/DP/经典扔鸡蛋.md";
  slug: "cs/algorithm/dp/经典扔鸡蛋";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Algorithm/DP/股票算法.md": {
	id: "CS/Algorithm/DP/股票算法.md";
  slug: "cs/algorithm/dp/股票算法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Algorithm/快速幂.md": {
	id: "CS/Algorithm/快速幂.md";
  slug: "cs/algorithm/快速幂";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Algorithm/树形常用算法.md": {
	id: "CS/Algorithm/树形常用算法.md";
  slug: "cs/algorithm/树形常用算法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Algorithm/线形常用算法.md": {
	id: "CS/Algorithm/线形常用算法.md";
  slug: "cs/algorithm/线形常用算法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/Linear/线形.md": {
	id: "CS/Database/Linear/线形.md";
  slug: "cs/database/linear/线形";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/Map/图形.md": {
	id: "CS/Database/Map/图形.md";
  slug: "cs/database/map/图形";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/Tree/单词查找树.md": {
	id: "CS/Database/Tree/单词查找树.md";
  slug: "cs/database/tree/单词查找树";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/Tree/堆.md": {
	id: "CS/Database/Tree/堆.md";
  slug: "cs/database/tree/堆";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/Tree/并查集.md": {
	id: "CS/Database/Tree/并查集.md";
  slug: "cs/database/tree/并查集";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/Tree/构建树.md": {
	id: "CS/Database/Tree/构建树.md";
  slug: "cs/database/tree/构建树";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/Tree/树形.md": {
	id: "CS/Database/Tree/树形.md";
  slug: "cs/database/tree/树形";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Database/数学.md": {
	id: "CS/Database/数学.md";
  slug: "cs/database/数学";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Docker/Docker.md": {
	id: "CS/Docker/Docker.md";
  slug: "cs/docker/docker";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Encoding/BOM.md": {
	id: "CS/Encoding/BOM.md";
  slug: "cs/encoding/bom";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/Encoding/Unicode.md": {
	id: "CS/Encoding/Unicode.md";
  slug: "cs/encoding/unicode";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/NetWork/Application/GRPC/GRPC.md": {
	id: "CS/NetWork/Application/GRPC/GRPC.md";
  slug: "cs/network/application/grpc/grpc";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/NetWork/Application/HTTP/HTTP.md": {
	id: "CS/NetWork/Application/HTTP/HTTP.md";
  slug: "cs/network/application/http/http";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/NetWork/Application/HTTP/HTTP状态码.md": {
	id: "CS/NetWork/Application/HTTP/HTTP状态码.md";
  slug: "cs/network/application/http/http状态码";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/NetWork/Application/HTTP/RESTful API.md": {
	id: "CS/NetWork/Application/HTTP/RESTful API.md";
  slug: "cs/network/application/http/restful-api";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/NetWork/Application/HTTP/URI、URL、URN、Data URI、Object URL.md": {
	id: "CS/NetWork/Application/HTTP/URI、URL、URN、Data URI、Object URL.md";
  slug: "cs/network/application/http/uriurlurndata-uriobject-url";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/NetWork/Network.md": {
	id: "CS/NetWork/Network.md";
  slug: "cs/network/network";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/OS/Linux.md": {
	id: "CS/OS/Linux.md";
  slug: "cs/os/linux";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/OS/OS.md": {
	id: "CS/OS/OS.md";
  slug: "cs/os/os";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"CS/OS/Ubuntu/包管理.md": {
	id: "CS/OS/Ubuntu/包管理.md";
  slug: "cs/os/ubuntu/包管理";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"DB/MongoDB/API.md": {
	id: "DB/MongoDB/API.md";
  slug: "db/mongodb/api";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"DB/MongoDB/MongoDB.md": {
	id: "DB/MongoDB/MongoDB.md";
  slug: "db/mongodb/mongodb";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"DB/MongoDB/权限.md": {
	id: "DB/MongoDB/权限.md";
  slug: "db/mongodb/权限";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"DB/MongoDB/索引.md": {
	id: "DB/MongoDB/索引.md";
  slug: "db/mongodb/索引";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Camera.md": {
	id: "GIS/Cesium/Camera.md";
  slug: "gis/cesium/camera";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Entity.md": {
	id: "GIS/Cesium/Entity.md";
  slug: "gis/cesium/entity";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Events.md": {
	id: "GIS/Cesium/Events.md";
  slug: "gis/cesium/events";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Imagery.md": {
	id: "GIS/Cesium/Imagery.md";
  slug: "gis/cesium/imagery";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Material.md": {
	id: "GIS/Cesium/Material.md";
  slug: "gis/cesium/material";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Model.md": {
	id: "GIS/Cesium/Model.md";
  slug: "gis/cesium/model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Particle.md": {
	id: "GIS/Cesium/Particle.md";
  slug: "gis/cesium/particle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Plugins.md": {
	id: "GIS/Cesium/Plugins.md";
  slug: "gis/cesium/plugins";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Post Processing.md": {
	id: "GIS/Cesium/Post Processing.md";
  slug: "gis/cesium/post-processing";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Property.md": {
	id: "GIS/Cesium/Property.md";
  slug: "gis/cesium/property";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Terrain.md": {
	id: "GIS/Cesium/Terrain.md";
  slug: "gis/cesium/terrain";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Viewer.md": {
	id: "GIS/Cesium/Viewer.md";
  slug: "gis/cesium/viewer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/Widget.md": {
	id: "GIS/Cesium/Widget.md";
  slug: "gis/cesium/widget";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Cesium/坐标和投影.md": {
	id: "GIS/Cesium/坐标和投影.md";
  slug: "gis/cesium/坐标和投影";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/GIS数据/3D Tiles.md": {
	id: "GIS/GIS数据/3D Tiles.md";
  slug: "gis/gis数据/3d-tiles";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/GIS数据/Tiles.md": {
	id: "GIS/GIS数据/Tiles.md";
  slug: "gis/gis数据/tiles";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/GIS数据/概览.md": {
	id: "GIS/GIS数据/概览.md";
  slug: "gis/gis数据/概览";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Leaflet/Layer.md": {
	id: "GIS/Leaflet/Layer.md";
  slug: "gis/leaflet/layer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Leaflet/投影.md": {
	id: "GIS/Leaflet/投影.md";
  slug: "gis/leaflet/投影";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/Leaflet/源码学习.md": {
	id: "GIS/Leaflet/源码学习.md";
  slug: "gis/leaflet/源码学习";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"GIS/坐标系.md": {
	id: "GIS/坐标系.md";
  slug: "gis/坐标系";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Algebra.md": {
	id: "Graphics/Babylon/Algebra.md";
  slug: "graphics/babylon/algebra";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Animation.md": {
	id: "Graphics/Babylon/Animation.md";
  slug: "graphics/babylon/animation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/AssetsManager.md": {
	id: "Graphics/Babylon/AssetsManager.md";
  slug: "graphics/babylon/assetsmanager";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Audio.md": {
	id: "Graphics/Babylon/Audio.md";
  slug: "graphics/babylon/audio";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Camera.md": {
	id: "Graphics/Babylon/Camera.md";
  slug: "graphics/babylon/camera";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Engine.md": {
	id: "Graphics/Babylon/Engine.md";
  slug: "graphics/babylon/engine";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Light.md": {
	id: "Graphics/Babylon/Light.md";
  slug: "graphics/babylon/light";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Material.md": {
	id: "Graphics/Babylon/Material.md";
  slug: "graphics/babylon/material";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Mesh.md": {
	id: "Graphics/Babylon/Mesh.md";
  slug: "graphics/babylon/mesh";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Particle.md": {
	id: "Graphics/Babylon/Particle.md";
  slug: "graphics/babylon/particle";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Scene.md": {
	id: "Graphics/Babylon/Scene.md";
  slug: "graphics/babylon/scene";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/SceneLoader.md": {
	id: "Graphics/Babylon/SceneLoader.md";
  slug: "graphics/babylon/sceneloader";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Shadow.md": {
	id: "Graphics/Babylon/Shadow.md";
  slug: "graphics/babylon/shadow";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Sprite.md": {
	id: "Graphics/Babylon/Sprite.md";
  slug: "graphics/babylon/sprite";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Babylon/Vec.md": {
	id: "Graphics/Babylon/Vec.md";
  slug: "graphics/babylon/vec";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Addons.md": {
	id: "Graphics/Three/Addons.md";
  slug: "graphics/three/addons";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Animation.md": {
	id: "Graphics/Three/Animation.md";
  slug: "graphics/three/animation";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Camera.md": {
	id: "Graphics/Three/Camera.md";
  slug: "graphics/three/camera";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Controls.md": {
	id: "Graphics/Three/Controls.md";
  slug: "graphics/three/controls";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/GUI.md": {
	id: "Graphics/Three/GUI.md";
  slug: "graphics/three/gui";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Geometory.md": {
	id: "Graphics/Three/Geometory.md";
  slug: "graphics/three/geometory";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Helper.md": {
	id: "Graphics/Three/Helper.md";
  slug: "graphics/three/helper";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Light.md": {
	id: "Graphics/Three/Light.md";
  slug: "graphics/three/light";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Loader.md": {
	id: "Graphics/Three/Loader.md";
  slug: "graphics/three/loader";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Material.md": {
	id: "Graphics/Three/Material.md";
  slug: "graphics/three/material";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Mesh.md": {
	id: "Graphics/Three/Mesh.md";
  slug: "graphics/three/mesh";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Model.md": {
	id: "Graphics/Three/Model.md";
  slug: "graphics/three/model";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Other.md": {
	id: "Graphics/Three/Other.md";
  slug: "graphics/three/other";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Renderer.md": {
	id: "Graphics/Three/Renderer.md";
  slug: "graphics/three/renderer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Scene.md": {
	id: "Graphics/Three/Scene.md";
  slug: "graphics/three/scene";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Texture.md": {
	id: "Graphics/Three/Texture.md";
  slug: "graphics/three/texture";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Three.md": {
	id: "Graphics/Three/Three.md";
  slug: "graphics/three/three";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/Three/Transform.md": {
	id: "Graphics/Three/Transform.md";
  slug: "graphics/three/transform";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/WebGPU/WGSL.md": {
	id: "Graphics/WebGPU/WGSL.md";
  slug: "graphics/webgpu/wgsl";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/WebGPU/概览.md": {
	id: "Graphics/WebGPU/概览.md";
  slug: "graphics/webgpu/概览";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/WebGPU/渲染管线.md": {
	id: "Graphics/WebGPU/渲染管线.md";
  slug: "graphics/webgpu/渲染管线";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/WebGPU/计算管线.md": {
	id: "Graphics/WebGPU/计算管线.md";
  slug: "graphics/webgpu/计算管线";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Graphics/图形学.md": {
	id: "Graphics/图形学.md";
  slug: "graphics/图形学";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Home.md": {
	id: "Home.md";
  slug: "home";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Deno/JSR.md": {
	id: "JSRuntime/Deno/JSR.md";
  slug: "jsruntime/deno/jsr";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Javascript运行时.md": {
	id: "JSRuntime/Javascript运行时.md";
  slug: "jsruntime/javascript运行时";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/Error.md": {
	id: "JSRuntime/Node.js/API/Error.md";
  slug: "jsruntime/nodejs/api/error";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/Module.md": {
	id: "JSRuntime/Node.js/API/Module.md";
  slug: "jsruntime/nodejs/api/module";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/buffer.md": {
	id: "JSRuntime/Node.js/API/buffer.md";
  slug: "jsruntime/nodejs/api/buffer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/child_process.md": {
	id: "JSRuntime/Node.js/API/child_process.md";
  slug: "jsruntime/nodejs/api/child_process";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/cluster.md": {
	id: "JSRuntime/Node.js/API/cluster.md";
  slug: "jsruntime/nodejs/api/cluster";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/console.md": {
	id: "JSRuntime/Node.js/API/console.md";
  slug: "jsruntime/nodejs/api/console";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/process.md": {
	id: "JSRuntime/Node.js/API/process.md";
  slug: "jsruntime/nodejs/api/process";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/string_decoder.md": {
	id: "JSRuntime/Node.js/API/string_decoder.md";
  slug: "jsruntime/nodejs/api/string_decoder";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/API/timer.md": {
	id: "JSRuntime/Node.js/API/timer.md";
  slug: "jsruntime/nodejs/api/timer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/CommonJS.md": {
	id: "JSRuntime/Node.js/CommonJS.md";
  slug: "jsruntime/nodejs/commonjs";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Deploy/node使用docker部署.md": {
	id: "JSRuntime/Node.js/Deploy/node使用docker部署.md";
  slug: "jsruntime/nodejs/deploy/node使用docker部署";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Framework/Egg.md": {
	id: "JSRuntime/Node.js/Framework/Egg.md";
  slug: "jsruntime/nodejs/framework/egg";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Node.js 特性.md": {
	id: "JSRuntime/Node.js/Node.js 特性.md";
  slug: "jsruntime/nodejs/nodejs-特性";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Packages/NPM.md": {
	id: "JSRuntime/Node.js/Packages/NPM.md";
  slug: "jsruntime/nodejs/packages/npm";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Packages/NPM和Yarn的区别.md": {
	id: "JSRuntime/Node.js/Packages/NPM和Yarn的区别.md";
  slug: "jsruntime/nodejs/packages/npm和yarn的区别";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Packages/PNPM.md": {
	id: "JSRuntime/Node.js/Packages/PNPM.md";
  slug: "jsruntime/nodejs/packages/pnpm";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Packages/Yarn.md": {
	id: "JSRuntime/Node.js/Packages/Yarn.md";
  slug: "jsruntime/nodejs/packages/yarn";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"JSRuntime/Node.js/Packages/package.json.md": {
	id: "JSRuntime/Node.js/Packages/package.json.md";
  slug: "jsruntime/nodejs/packages/packagejson";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Performance/Javascript优化.md": {
	id: "Performance/Javascript优化.md";
  slug: "performance/javascript优化";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Performance/preload, prefetch, prerender.md": {
	id: "Performance/preload, prefetch, prerender.md";
  slug: "performance/preload-prefetch-prerender";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/Base64编码.md": {
	id: "ToBeContinue/Base64编码.md";
  slug: "tobecontinue/base64编码";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/CJS, ESM, Webpack.md": {
	id: "ToBeContinue/CJS, ESM, Webpack.md";
  slug: "tobecontinue/cjs-esm-webpack";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/Heap.md": {
	id: "ToBeContinue/Heap.md";
  slug: "tobecontinue/heap";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/Import maps.md": {
	id: "ToBeContinue/Import maps.md";
  slug: "tobecontinue/import-maps";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/JSON和Javascript.md": {
	id: "ToBeContinue/JSON和Javascript.md";
  slug: "tobecontinue/json和javascript";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/Javascript正则.md": {
	id: "ToBeContinue/Javascript正则.md";
  slug: "tobecontinue/javascript正则";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/React 事件.md": {
	id: "ToBeContinue/React 事件.md";
  slug: "tobecontinue/react-事件";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/React 的错误捕获.md": {
	id: "ToBeContinue/React 的错误捕获.md";
  slug: "tobecontinue/react-的错误捕获";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/为啥react没有keep-alive.md": {
	id: "ToBeContinue/为啥react没有keep-alive.md";
  slug: "tobecontinue/为啥react没有keep-alive";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/二分法.md": {
	id: "ToBeContinue/二分法.md";
  slug: "tobecontinue/二分法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/从d.ts了解typescript.md": {
	id: "ToBeContinue/从d.ts了解typescript.md";
  slug: "tobecontinue/从dts了解typescript";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/前后端实时通信.md": {
	id: "ToBeContinue/前后端实时通信.md";
  slug: "tobecontinue/前后端实时通信";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/单调栈.md": {
	id: "ToBeContinue/单调栈.md";
  slug: "tobecontinue/单调栈";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/博弈算法.md": {
	id: "ToBeContinue/博弈算法.md";
  slug: "tobecontinue/博弈算法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/多米诺和托米诺平铺.md": {
	id: "ToBeContinue/多米诺和托米诺平铺.md";
  slug: "tobecontinue/多米诺和托米诺平铺";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/大文件如何上传.md": {
	id: "ToBeContinue/大文件如何上传.md";
  slug: "tobecontinue/大文件如何上传";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/子序列问题.md": {
	id: "ToBeContinue/子序列问题.md";
  slug: "tobecontinue/子序列问题";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/寻找中位数.md": {
	id: "ToBeContinue/寻找中位数.md";
  slug: "tobecontinue/寻找中位数";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/时区.md": {
	id: "ToBeContinue/时区.md";
  slug: "tobecontinue/时区";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/树状数组.md": {
	id: "ToBeContinue/树状数组.md";
  slug: "tobecontinue/树状数组";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/格雷码.md": {
	id: "ToBeContinue/格雷码.md";
  slug: "tobecontinue/格雷码";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/直播流.md": {
	id: "ToBeContinue/直播流.md";
  slug: "tobecontinue/直播流";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/贡献度算法.md": {
	id: "ToBeContinue/贡献度算法.md";
  slug: "tobecontinue/贡献度算法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/进制转换.md": {
	id: "ToBeContinue/进制转换.md";
  slug: "tobecontinue/进制转换";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"ToBeContinue/随机算法.md": {
	id: "ToBeContinue/随机算法.md";
  slug: "tobecontinue/随机算法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Utils/Git/Git hooks husky lint-staged.md": {
	id: "Utils/Git/Git hooks husky lint-staged.md";
  slug: "utils/git/git-hooks-husky-lint-staged";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Utils/Git/Git原理.md": {
	id: "Utils/Git/Git原理.md";
  slug: "utils/git/git原理";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Utils/Git/Git命令.md": {
	id: "Utils/Git/Git命令.md";
  slug: "utils/git/git命令";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Utils/Git/Git工作流.md": {
	id: "Utils/Git/Git工作流.md";
  slug: "utils/git/git工作流";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Utils/Playwright/Playwright.md": {
	id: "Utils/Playwright/Playwright.md";
  slug: "utils/playwright/playwright";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"Utils/Puppetter/Puppetter优化.md": {
	id: "Utils/Puppetter/Puppetter优化.md";
  slug: "utils/puppetter/puppetter优化";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".mdx"] };
"前端/CSS/CSS.md": {
	id: "前端/CSS/CSS.md";
  slug: "前端/css/css";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/CSS/Color.md": {
	id: "前端/CSS/Color.md";
  slug: "前端/css/color";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/CSS/Grid.md": {
	id: "前端/CSS/Grid.md";
  slug: "前端/css/grid";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/CSS/Selector.md": {
	id: "前端/CSS/Selector.md";
  slug: "前端/css/selector";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/HTML/HTML.md": {
	id: "前端/HTML/HTML.md";
  slug: "前端/html/html";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/ArrayBuffer.md": {
	id: "前端/Javascript/ArrayBuffer.md";
  slug: "前端/javascript/arraybuffer";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Audio.md": {
	id: "前端/Javascript/Audio.md";
  slug: "前端/javascript/audio";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Document.md": {
	id: "前端/Javascript/Document.md";
  slug: "前端/javascript/document";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/File System API.md": {
	id: "前端/Javascript/File System API.md";
  slug: "前端/javascript/file-system-api";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Function.md": {
	id: "前端/Javascript/Function.md";
  slug: "前端/javascript/function";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Number/Bigint.md": {
	id: "前端/Javascript/Number/Bigint.md";
  slug: "前端/javascript/number/bigint";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Number/Javascript浮点数.md": {
	id: "前端/Javascript/Number/Javascript浮点数.md";
  slug: "前端/javascript/number/javascript浮点数";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Number/Number.md": {
	id: "前端/Javascript/Number/Number.md";
  slug: "前端/javascript/number/number";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Object/Array.md": {
	id: "前端/Javascript/Object/Array.md";
  slug: "前端/javascript/object/array";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Object/Javascript.md": {
	id: "前端/Javascript/Object/Javascript.md";
  slug: "前端/javascript/object/javascript";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Object/Javascript面向对象.md": {
	id: "前端/Javascript/Object/Javascript面向对象.md";
  slug: "前端/javascript/object/javascript面向对象";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Object/Javscript 属性和方法.md": {
	id: "前端/Javascript/Object/Javscript 属性和方法.md";
  slug: "前端/javascript/object/javscript-属性和方法";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Object/RegExp.md": {
	id: "前端/Javascript/Object/RegExp.md";
  slug: "前端/javascript/object/regexp";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Object/This.md": {
	id: "前端/Javascript/Object/This.md";
  slug: "前端/javascript/object/this";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Promise.md": {
	id: "前端/Javascript/Promise.md";
  slug: "前端/javascript/promise";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/Reflect.md": {
	id: "前端/Javascript/Reflect.md";
  slug: "前端/javascript/reflect";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/作用域.md": {
	id: "前端/Javascript/作用域.md";
  slug: "前端/javascript/作用域";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Javascript/执行上下文.md": {
	id: "前端/Javascript/执行上下文.md";
  slug: "前端/javascript/执行上下文";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/React/API.md": {
	id: "前端/React/API.md";
  slug: "前端/react/api";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/React/Headless UI 和 React Hooks.md": {
	id: "前端/React/Headless UI 和 React Hooks.md";
  slug: "前端/react/headless-ui-和-react-hooks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/React/Hooks.md": {
	id: "前端/React/Hooks.md";
  slug: "前端/react/hooks";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/React/Utils.md": {
	id: "前端/React/Utils.md";
  slug: "前端/react/utils";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Typescript/Typescript.md": {
	id: "前端/Typescript/Typescript.md";
  slug: "前端/typescript/typescript";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Typescript/类型.md": {
	id: "前端/Typescript/类型.md";
  slug: "前端/typescript/类型";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Vue/Vue Router.md": {
	id: "前端/Vue/Vue Router.md";
  slug: "前端/vue/vue-router";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Vue/响应式系统.md": {
	id: "前端/Vue/响应式系统.md";
  slug: "前端/vue/响应式系统";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"前端/Vue/组件.md": {
	id: "前端/Vue/组件.md";
  slug: "前端/vue/组件";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/Chrome调试.md": {
	id: "杂谈/Chrome调试.md";
  slug: "杂谈/chrome调试";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/JS如何获取精确的时间戳.md": {
	id: "杂谈/JS如何获取精确的时间戳.md";
  slug: "杂谈/js如何获取精确的时间戳";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/node.js内存泄漏.md": {
	id: "杂谈/node.js内存泄漏.md";
  slug: "杂谈/nodejs内存泄漏";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/从egg-helper学习egg源码.md": {
	id: "杂谈/从egg-helper学习egg源码.md";
  slug: "杂谈/从egg-helper学习egg源码";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/内存泄漏及排查.md": {
	id: "杂谈/内存泄漏及排查.md";
  slug: "杂谈/内存泄漏及排查";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/如何处理循环引用.md": {
	id: "杂谈/如何处理循环引用.md";
  slug: "杂谈/如何处理循环引用";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/常见的问题及解决方案.md": {
	id: "杂谈/常见的问题及解决方案.md";
  slug: "杂谈/常见的问题及解决方案";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/开源如何保证收入.md": {
	id: "杂谈/开源如何保证收入.md";
  slug: "杂谈/开源如何保证收入";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/我的大前端世界观.md": {
	id: "杂谈/我的大前端世界观.md";
  slug: "杂谈/我的大前端世界观";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/网页如何唤醒本地程序.md": {
	id: "杂谈/网页如何唤醒本地程序.md";
  slug: "杂谈/网页如何唤醒本地程序";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/解决ESM Import 过多.md": {
	id: "杂谈/解决ESM Import 过多.md";
  slug: "杂谈/解决esm-import-过多";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/软件开发周期.md": {
	id: "杂谈/软件开发周期.md";
  slug: "杂谈/软件开发周期";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"杂谈/面试复习.md": {
	id: "杂谈/面试复习.md";
  slug: "杂谈/面试复习";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/Electron/Electron 优化.md": {
	id: "跨平台/Electron/Electron 优化.md";
  slug: "跨平台/electron/electron-优化";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/Electron/日志.md": {
	id: "跨平台/Electron/日志.md";
  slug: "跨平台/electron/日志";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/ADB.md": {
	id: "跨平台/RN/ADB.md";
  slug: "跨平台/rn/adb";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/三方库.md": {
	id: "跨平台/RN/三方库.md";
  slug: "跨平台/rn/三方库";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/事件.md": {
	id: "跨平台/RN/事件.md";
  slug: "跨平台/rn/事件";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/样式.md": {
	id: "跨平台/RN/样式.md";
  slug: "跨平台/rn/样式";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/模块.md": {
	id: "跨平台/RN/模块.md";
  slug: "跨平台/rn/模块";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/组件.md": {
	id: "跨平台/RN/组件.md";
  slug: "跨平台/rn/组件";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/踩坑.md": {
	id: "跨平台/RN/踩坑.md";
  slug: "跨平台/rn/踩坑";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
"跨平台/RN/配置.md": {
	id: "跨平台/RN/配置.md";
  slug: "跨平台/rn/配置";
  body: string;
  collection: "docs";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
