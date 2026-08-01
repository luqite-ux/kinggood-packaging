import type { Dictionary } from '../types'

const zh = {
  locale: 'zh',
  languageName: '中文',
  navigation: {
    home: '首页', products: '产品', customPackaging: '定制包装', industries: '行业应用', about: '关于我们', news: '新闻', contact: '联系我们', requestQuote: '获取报价',
    mainNavigation: '主导航', mobileNavigation: '移动端导航', openMenu: '打开菜单', closeMenu: '关闭菜单',
  },
  actions: {
    requestQuote: '获取报价', exploreProducts: '浏览产品', viewProduct: '查看产品', readMore: '阅读更多', learnMore: '了解更多',
    sendEnquiry: '发送询盘', sending: '发送中…', sendAnotherEnquiry: '再次发送询盘', backToProducts: '返回产品列表', backToNews: '返回新闻列表',
  },
  hero: {
    ariaLabel: '首屏展示', eyebrow: '金固德包装材料（南通）股份有限公司', title: '工程化木质包装', titleHighlight: '服务全球物流',
    description: 'KINGGOOD 专注于为工业运输、仓储及出口物流设计和制造木托盘、重型木箱和电缆盘。我们可根据货物尺寸、载荷、搬运设备和目的地要求配置包装解决方案。',
    metrics: {
      operating: { value: '始于 2010 年', label: '运营至今' },
      facilityArea: { value: '36,300 平方米', label: '厂区面积' },
      production: { value: '5 个车间', label: '生产车间' },
      palletsPerDay: { value: '3,000+', label: '托盘 / 天' },
    },
  },
  footer: {
    description: '金固德包装材料（南通）股份有限公司——面向全球物流的木托盘、重型木箱和电缆盘制造商，成立于 2010 年。',
    navigation: '网站导航', products: '产品', services: '服务', customPackaging: '定制包装', industriesServed: '服务行业', allRightsReserved: '保留所有权利。', location: '中国江苏省南通市',
  },
  forms: {
    fullName: '姓名', fullNamePlaceholder: '请输入您的姓名', company: '公司名称', companyPlaceholder: '请输入公司名称',
    email: '电子邮箱', emailPlaceholder: 'you@company.com', countryRegion: '国家 / 地区', countryRegionPlaceholder: '例如：德国',
    productInterest: '感兴趣的产品', selectProduct: '请选择产品', otherProduct: '其他 / 暂不确定',
    message: '留言', messagePlaceholder: '请告诉我们您的货物、尺寸、目的地和预计采购量。',
    enquiryReceived: '感谢您的询盘', enquiryReceivedDescription: '我们的出口团队已收到您的信息，将在一个工作日内回复。',
    enquiryFailed: '询盘发送失败，请重试或发送邮件至 kinggood66@163.com。',
  },
  pages: {
    products: { eyebrow: '产品中心', title: '应对每种物流挑战的木质包装', description: '浏览适用于工业搬运和出口运输的工程化托盘、重型木箱和电缆盘。' },
    customPackaging: { eyebrow: '定制包装', title: '围绕您的货物打造包装', description: '请告知货物、运输路线和搬运要求，我们将提供实用的木质包装方案。' },
    industries: { eyebrow: '行业应用', title: '为严苛供应链而打造', description: '为工业制造、机械设备、物流和出口业务提供可靠包装。' },
    about: { eyebrow: '关于 KINGGOOD', title: '全球物流的木质包装合作伙伴', description: '从木材加工到成品包装，我们支持可靠的工业交付。' },
    news: { eyebrow: '新闻', title: 'KINGGOOD 最新动态', description: '公司新闻、包装指南和物流洞察。' },
    contact: { eyebrow: '联系我们', title: '开始您的包装询盘', description: '请将您的货物和目的地要求发送给我们的出口团队。' },
  },
  errors: {
    notFoundTitle: '未找到页面', notFoundDescription: '您请求的页面不可用或可能已移动。',
    unavailableTitle: '内容暂不可用', unavailableDescription: '请稍后重试，或联系我们的团队获取帮助。',
  },
  carousel: {
    previousSlide: '上一张', nextSlide: '下一张', pause: '暂停轮播', play: '播放轮播', slideLabel: '图片',
    ariaLabel: '工厂图片轮播', goToSlide: '转到第 {slide} 张图片',
    imageAlt: { factoryExterior: 'KINGGOOD 工厂外景', factoryProduction: 'KINGGOOD 工厂生产车间' },
  },
  productOverlays: {
    category: '类别', materials: '材料', dimensions: '尺寸', applications: '应用', specifications: '技术规格', handlingNotes: '操作注意事项',
    requestQuote: '获取报价', minimumOrderQuantity: 'MOQ', rfq: 'RFQ',
  },
} satisfies Dictionary

export default zh
