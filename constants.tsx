
import React from 'react';

export const INITIAL_COMPANY_INTRO = `北京嘉禾云网科技有限公司是面向制造业企业提供智能化解决方案 and 软硬件产品的创新型高技术企业。公司以“助力智能制造、塑造智慧企业”为核心理念，运用先进的移动、互联网技术，创新企业物流、生产、协作、决策等业务运作过程，打造国内一流的智能制造平台，推动制造业企业业务变革 and 转型升级。
      公司的核心团队成员来自于国内先进的ERP/MES软件公司-北京并捷信息技术有限公司，既有清华大学、北京大学、武汉大学、兰州大学等名校学历背景，也有十多年的制造业信息化从业经验；在长期的用户实践中，培养了包括航天科工集团、航天科技集团、中化装备集团等大型企业用户。`;

export const TECH_SPECS_DEFAULT = "嘉禾云网采用先进的微服务架构与工业互联网协议，支持边缘计算、大数据实时分析 with AI决策支持。系统具备极高的稳定性与可扩展性，能够无缝对接主流工业自动化设备。";

export const TECH_FEATURES_DEFAULT = [
  {
    title: "云原生架构",
    items: ["分布式高可用容器云平台", "弹性资源调度与扩缩容", "微服务治理体系"]
  },
  {
    title: "工业大数据引擎",
    items: ["工业级时序数据库架构", "亿级数据并发处理", "多维实时交互分析"]
  },
  {
    title: "边缘计算网关",
    items: ["多协议边缘接入引擎", "本地控制逻辑快速响应", "断网缓存与自动恢复"]
  },
  {
    title: "自研工业AI",
    items: ["故障预测性维护模型", "生产效能智能分析", "工艺参数动态优化"]
  },
  {
    title: "安全合规体系",
    items: ["全链路国密加密技术", "完善的角色权限管理", "等保三级安全合规"]
  },
  {
    title: "工业协同平台",
    items: ["跨地域多组织协同办公", "供应链全链路透明化", "移动端实时监控与预警"]
  }
];

export const INDUSTRY_FEATURES_DEFAULT = "嘉禾云网深耕垂直行业，针对不同制造模式提供精准的业务适配。我们通过深度集成的数字化方案，解决企业从排产到交付的核心痛点。";

export const INDUSTRY_DETAILS_DEFAULT = [
  {
    id: "ind1",
    name: "军品总装",
    description: "针对航天、航空、兵器等总装型企业，核心解决配套齐套性与军工合规性追溯。",
    features: ["数字化工艺指令(EWI)下达", "全流程关键特性质量追溯(Q-Trace)", "多级物料配套齐套性分析", "总装脉动流水线协同控制"]
  },
  {
    id: "ind2",
    name: "机械制造",
    description: "面向高端装备与零部件制造，关注离散工序下的柔性排产与设备OEE提升。",
    features: ["有限产能约束下的高级排产", "DNC/MDC设备联网采集", "工序级物料拉动看板", "数控程序版本控制与传输"]
  },
  {
    id: "ind3",
    name: "电子装配",
    description: "适配SMT、插件、组装工艺模式，应对高频换线与元器件防错要求。",
    features: ["SMT全线物料防错料管理", "锡膏温回及寿命管理系统", "AOI/SPI品质数据闭环集成", "ESD防静电环境参数监控"]
  },
  {
    id: "ind4",
    name: "装备维修",
    description: "覆盖单机及大型系统的维修全生命周期，实现从故障报修到归档。 ",
    features: ["装备维修全生命周期电子履历", "维修工艺引导与AR远程辅助", "故障根因智能分析决策", "备品备件库存预测性管理"]
  },
  {
    id: "ind5",
    name: "化工制药",
    description: "严格符合GMP/FDA规范，关注配方管理与生产过程的连续性。 ",
    features: ["电子批记录(eBR)系统", "配方/工艺参数防错控制", "LIMS实验室系统无缝对接", "安全环保与危险源实时监控"]
  },
  {
    id: "ind6",
    name: "智能产线",
    description: "针对高度自动化的柔性产线，实现工业控制层与业务管理层的实时协同。",
    features: ["AGV调度与立体库深度集成", "产线逻辑编排与协同仿真", "数字孪生车间实时监控", "异常事件智能分类与秒级推送"]
  }
];

export const INDUSTRY_TAGS_DEFAULT = ['军工', '机械', '电子', '维修', '化工', '自动化'];
export const INDUSTRY_STAT_VALUE_DEFAULT = "6大核心行业";
export const INDUSTRY_STAT_LABEL_DEFAULT = "全覆盖垂直方案";
export const INDUSTRY_IMAGE_URL_DEFAULT = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000";

export const INITIAL_PRODUCTS = [
  { id: 'p1', name: '设备物联网系统', description: '实时采集、监控与分析工业设备数据。', imageUrl: 'https://picsum.photos/seed/iot/800/400', fullSpecs: '高性能物联网网关，支持Modbus, OPC UA, MQTT等协议。', features: ['多协议支持', '低延迟采集', '边缘计算', '状态监测'] },
  { id: 'p2', name: 'iMES制造执行系统', description: '全面的车间生产管理与排产系统业务运作过程。', imageUrl: 'https://picsum.photos/seed/imes/800/400', fullSpecs: '计划排产、物料跟踪、质量管理、设备维护。', features: ['精益生产', '物料追溯', '品质管控', '数字化排产'] },
  { id: 'p3', name: 'iEMIS企业运营管理系统', description: '打通研发、采购、生产与销售协作。', imageUrl: 'https://picsum.photos/seed/iemis/800/400', fullSpecs: '模块化ERP，高度灵活适配中大型企业需求。', features: ['全流程协作', '模块化设计', '柔性适配', '业财一体化'] },
  { id: 'p4', name: 'iAPE生产效能分析系统', description: '数据驱动的OEE与生产力提升工具。', imageUrl: 'https://picsum.photos/seed/iape/800/400', fullSpecs: '智能看板，故障根因分析，效率趋势预测。', features: ['OEE实时分析', '损失根因追查', '效率预测', '智能报表'] },
  { id: 'p5', name: 'iMPS消息推送系统', description: '多渠道实时生产预警与通知。', imageUrl: 'https://picsum.photos/seed/imps/800/400', fullSpecs: '支持微信、短信、钉钉等全平台接入。', features: ['秒级触达', '全平台适配', '分级预警', '消息归档'] },
  { id: 'p6', name: 'iDSS企业大数据分析平台', description: '企业级经营看板与智能报表中心。', imageUrl: 'https://picsum.photos/seed/idss/800/400', fullSpecs: '海量数据并行处理，可视化交互分析。', features: ['多维分析', '亿级处理', '自助仪表盘', '决策支持'] },
];

export const INITIAL_CASES = [
  { id: 'c1', industry: '航天军工', name: '航天科工某分部智能车间', logoUrl: 'https://picsum.photos/seed/aero/200/200', summary: '实现数字化生产线改造，提升效能30%。', content: '本项目涉及全线设备联网与MES系统部署，打通了研发设计与生产现场。', imageUrl: 'https://picsum.photos/seed/aero-full/800/400', relatedProducts: ['iMES', 'IoT网关', 'iDSS'] },
  { id: 'c2', industry: '装备制造', name: '中化装备全自动装配线', logoUrl: 'https://picsum.photos/seed/chem/200/200', summary: '全生命周期质量追溯，良品率提升5%。', content: '引入iEMIS系统，优化供应链协作。', imageUrl: 'https://picsum.photos/seed/chem-full/800/400', relatedProducts: ['iEMIS', 'iAPE'] },
  { id: 'c3', industry: '石油石化', name: '某炼厂大数据预测性维护', logoUrl: 'https://picsum.photos/seed/oil/200/200', summary: '基于iDSS的设备预测分析。', content: '部署设备物联网系统，实时监控高危泵组状态。', imageUrl: 'https://picsum.photos/seed/oil-full/800/400', relatedProducts: ['iDSS', '设备物联网系统'] },
];

export const INITIAL_NEWS = [
  { id: 'n1', title: '嘉禾云网荣获2024智能制造创新大奖', summary: '公司在行业峰会上凭借iMES系统获得专家一致认可。', content: '近日，2024年度智能制造高峰论坛在京举行。嘉禾云网凭借卓越的技术实力和深厚的行业积累，斩获“年度最具影响力解决方案奖”。', imageUrl: 'https://picsum.photos/seed/news1/600/400', date: '2024-05-10', clicks: 1250, isPinned: true, createdAt: 1715328000000 },
  { id: 'n2', title: '深度合作：嘉禾云网与某高校签署战略合作协议', summary: '产学研结合，共同攻克工业互联网核心难题。', content: '为了加强人才储备与技术创新，嘉禾云网正式与国内顶尖高校达成合作。', imageUrl: 'https://picsum.photos/seed/news2/600/400', date: '2024-05-08', clicks: 800, isPinned: false, createdAt: 1715155200000 },
  { id: 'n3', title: '新版本发布：iAPE 2.0 正式上线', summary: '更智能的算法，更简洁的界面，助您掌控生产每一秒。', content: 'iAPE 2.0 引入了全新的AI预测引擎。', imageUrl: 'https://picsum.photos/seed/news3/600/400', date: '2024-05-05', clicks: 450, isPinned: false, createdAt: 1714896000000 },
  { id: 'n4', title: '嘉禾云网助力航天项目圆满成功', summary: '我司技术团队提供全方位现场保障支持。', content: '作为长期合作伙伴，我们为某重大工程提供了坚实的信息化保障。', imageUrl: 'https://picsum.photos/seed/news4/600/400', date: '2024-05-01', clicks: 2100, isPinned: false, createdAt: 1714550400000 },
  { id: 'n5', title: '企业文化：嘉禾云网2024 spring 团建圆满落幕', summary: '凝聚团队力量，共绘科技蓝图。', content: '公司全员前往京郊进行了为期两天的拓展训练。', imageUrl: 'https://picsum.photos/seed/news5/600/400', date: '2024-04-25', clicks: 300, isPinned: false, createdAt: 1714032000000 },
];

export const DEFAULT_ADMIN = {
  username: 'admin',
  passwordHash: 'admin'
};

export const DEFAULT_CONTACT = {
  address: '北京市大兴区生物医药基地庆丰西路27号',
  phone: '010-84505763',
  email: 'contact@jhcloudnet.com'
};
