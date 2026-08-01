import type { Product, ProductHighlight } from '../site'
import type { Locale } from './config'

type ProductOverlay = {
  name: string
  tagline: string
  summary: string
  overview: string
  highlights: ProductHighlight[]
  materials: string[]
  applications: string[]
  handlingNotes: string[]
  specificationLabels: Record<string, string>
}

type TranslatedLocale = Exclude<Locale, 'en'>

const productOverlays: Record<TranslatedLocale, Partial<Record<string, ProductOverlay>>> = {
  zh: {
    'eu-standard-solid-wood-pallet': {
      name: '欧式标准实木托盘',
      tagline: '面向欧洲及国际物流的坚固实木结构。',
      summary: 'KINGGOOD 按欧洲标准尺寸生产实木托盘，采用自有原木加工至组装供应链处理的窑干木材。可根据目的地要求及适用进口法规安排处理方式与出口文件。',
      overview: '该托盘采用欧洲标准占地尺寸，由实木铺板和四向进叉支撑梁构成。铺板厚度、铺板数量及支撑梁尺寸可在结构允许范围内按订单要求调整。',
      highlights: [
        { title: '实木结构', description: '窑干实木在常规仓储与叉车作业条件下具有较高结构刚性，便于维修并可长期使用。' },
        { title: '处理方式可配置', description: '植物检疫处理类型及文件按目的地和适用进口法规确认。' },
        { title: '便于维修', description: '铺板和支撑梁可单独更换，有助于延长使用周期并降低替换成本。' },
      ],
      materials: ['窑干实木（松木、杨木或同等材料）', '按要求使用镀锌或标准钉及紧固件', '处理方式：按目的地要求确认'],
      applications: ['常规仓储与配送', '出口集货与集装箱装载', '自动化物流及货架系统（视尺寸而定）', '需要坚固平整底座的重型货物'],
      handlingNotes: ['置于平整干燥表面，避免长期露天存放。', '每次重复使用前检查铺板是否损坏。', '叉车货叉宽度及进叉方向须与托盘结构匹配。', '下单前应确认目的地国家的处理要求。'],
      specificationLabels: { Construction: '结构', Entry: '进叉方式', Footprint: '占地尺寸', Treatment: '处理方式', 'Load capacity': '承载能力' },
    },
    'international-standard-plywood-pallet': {
      name: '国际标准胶合板托盘',
      tagline: '工程胶合板带来尺寸稳定性与更轻自重。',
      summary: '该托盘采用热压多层胶合板制造，相较同等实木结构具有更稳定的尺寸、更好的抗翘曲表现和更轻的自重。出口适用性以及所需处理或文件，将根据目的地和货物要求逐项评估。',
      overview: '托盘面板由热压多层板制成，按指定占地尺寸裁切，并与实木或胶合板支撑块组装。平整面板和一致公差适用于自动搬运线及立体仓储。',
      highlights: [
        { title: '尺寸稳定', description: '多层交错结构可减少翘曲，并在湿度与载荷变化时保持平整面几何。' },
        { title: '自重更轻', description: '工程胶合板结构比实木结构更轻，有助于降低单次运输总重量。' },
        { title: '精密加工', description: '数控裁切与一致厚度有助于适配标准叉车、AGV 和货架系统。' },
      ],
      materials: ['热压多层胶合板（杨木、桦木或同等材料）', '支撑块：按要求采用实木或胶合板层压件', '胶黏剂：需要时采用低甲醛等级'],
      applications: ['自动化仓储与 AGV 系统', '需要平整一致面板的货架系统', '需要较轻托盘底座的出口运输', '精密货物与电子产品配送'],
      handlingNotes: ['避免拖拽或跌落，以防边缘分层。', '存放于干燥环境，避免长时间接触积水。', '处理及文件要求按目的地与适用法规确认。', '每次重复使用前检查面板表面及支撑块连接。'],
      specificationLabels: { Construction: '结构', Entry: '进叉方式', Footprint: '占地尺寸', Treatment: '处理方式', 'Load capacity': '承载能力' },
    },
    'custom-sized-pallet': {
      name: '定制尺寸托盘',
      tagline: '围绕货物、搬运设备和物流要求进行配置。',
      summary: '定制托盘可依据货物占地、纸箱排布、叉车或 AGV 参数、货架尺寸、生产线节距及集装箱或卡车内部尺寸从零设计。精确公差有助于减少自动化环境中的移位、卡滞和装载失败。',
      overview: '当标准托盘造成板面浪费、货物悬伸或设备兼容问题时，定制托盘可直接针对这些限制设计。铺板与支撑梁按指定尺寸加工，公差会预先确认以匹配生产线要求。',
      highlights: [
        { title: '匹配货物与设备', description: '尺寸依据货物占地、纸箱排布、叉车货叉间距、AGV 导向要求和货架库位设置。' },
        { title: '优化集装箱与卡车装载', description: '根据车辆与集装箱内部尺寸计算占地，以提高单车装载效率并减少运输空间浪费。' },
        { title: '自动化级公差', description: '对平整度、厚度和方正度进行控制，支持自动化与机器人产线稳定运行。' },
      ],
      materials: ['实木：按规格采用松木、杨木或同等材料', '胶合板：热压多层结构，等级按要求确定', '紧固件及处理方式：按项目确认'],
      applications: ['自动化生产线与机器人搬运单元', '基于 AGV 的仓储和智能物流系统', '定制货架库位与立体仓库', '针对特定货物组合优化卡车及集装箱装载'],
      handlingNotes: ['询价时请提供叉车货叉尺寸及进叉方向。', '设计阶段请确认 AGV 轨距和传感器间隙要求。', '处理要求按目的地确认。', '需要时可在生产前确认图纸或样品。'],
      specificationLabels: { Construction: '结构', Dimensions: '尺寸', Entry: '进叉方式', Tolerances: '公差', Treatment: '处理方式' },
    },
    'solid-wood-crate': {
      name: '实木包装箱',
      tagline: '适用于重型机械和复杂出口条件的高刚性结构。',
      summary: '实木包装箱以天然木材和加强连接形成高结构刚性，适合重型机械、资本设备及在多式联运出口过程中需要坚固防护的高价值货物。实际承载能力取决于每个项目确认的结构规格。',
      overview: '实木包装箱由实木底框、竖向角柱以及横向或斜向墙体构件组成。箱板依据载荷要求采用钉接或螺栓连接，底座集成叉车进叉结构。结构设计、壁厚和板材尺寸根据货物重量、堆码要求和搬运方式逐项确认。',
      highlights: [
        { title: '结构刚性', description: '实木框架和加强连接可承受多式联运及堆码中的压缩、侧向变形与冲击作用。' },
        { title: '防护可配置', description: '可根据货物敏感程度和运输路线配置防潮内衬、缓冲材料及内部支撑。' },
        { title: '现场维修与重复使用', description: '在结构、载荷和搬运条件允许时，可现场更换单块箱板或构件以支持重复使用。' },
      ],
      materials: ['实木框架构件及箱板（松木或同等材料）', '按要求使用金属护角和螺栓紧固件', '按需配置防潮内衬、泡棉或 EPE 内衬'],
      applications: ['重型工业机械及资本设备', '电机、压缩机及大型机械组件', '需要较强结构防护的高价值设备', '存在较大堆码载荷的多式联运出口货物'],
      handlingNotes: ['设计时须说明起吊方式，以便确定正确结构细节。', '下单阶段须确认堆码载荷和层数。', '出口目的地处理要求按适用法规确认。', '每次搬运后、重复使用前检查箱体完整性。'],
      specificationLabels: { Construction: '结构', Joinery: '连接方式', 'Load capacity': '承载能力', 'Wall thickness': '箱壁厚度', Treatment: '处理方式' },
    },
    'plywood-crate': {
      name: '胶合板包装箱',
      tagline: '更轻自重、灵活尺寸与高效搬运。',
      summary: '胶合板包装箱以低于同等实木结构的自重提供封闭式结构，有助于降低整体运输重量。面板尺寸和外形尺寸可定制，包括超宽、超长和分体式形式。处理要求取决于材料组成、目的地和适用进口法规。',
      overview: '胶合板包装箱由实木或胶合板框架与胶合板箱面组成，采用金属蝴蝶扣、钉件或贯穿螺栓连接。底座集成叉车进叉结构。分体结构便于多件组装、拆卸、搬运或重复使用。',
      highlights: [
        { title: '自重较低', description: '工程胶合板以更低自重形成结构封闭，可减少单次运输总重量。' },
        { title: '尺寸灵活', description: '支持标准及非标准尺寸，包括超宽、超长和分体式配置。' },
        { title: '面板平整', description: '平整胶合板表面便于印字、模板喷涂和标签粘贴。' },
      ],
      materials: ['胶合板面板：层数、等级和厚度按规格确定', '框架构件：实木或层压木材', '按需使用金属扣件、钉件或螺栓'],
      applications: ['轻型至中型工业部件', '需要定制尺寸的石材、瓷砖和平板包装货物', '需要平整封闭面的电子产品与仪器', '需要分体结构的超大货物'],
      handlingNotes: ['设计时确认预期搬运方式。', '避免尖锐边缘撞击面板，以防分层。', '下单前核对目的地处理要求。', '分体式包装箱应按提供的顺序组装。'],
      specificationLabels: { Construction: '结构', Fastening: '紧固方式', 'Load capacity': '承载能力', 'Format options': '形式选项', Treatment: '处理方式' },
    },
    'open-frame-crate': {
      name: '开放式框架包装箱',
      tagline: '为超大、不规则及带突出部件货物提供可接近的结构框架。',
      summary: '开放式框架包装箱由承重底框和角柱结构组成，不设置固定侧板或顶板。这样可从多侧直接装载无法放入常规箱体的不规则或超大货物，也能容纳可能被刚性侧板损坏的突出部件。',
      overview: '承重底框采用实木、胶合板层压件或两者组合制造，并提供所需承载能力和叉车进叉位置。角柱和交叉撑在运输中保持结构外廓，货物通过螺栓固定件、防滑垫或捆扎点直接固定于底框。',
      highlights: [
        { title: '直接装载', description: '无固定侧板，可从任意一侧装卸，无需拆除箱板。' },
        { title: '适配不规则外形', description: '开放框架可适应不规则轮廓、偏心载荷及机械突出部件。' },
        { title: '定制约束与支架', description: '可根据货物几何在底座中设计防滑垫、捆扎环、货物支架和固定件。' },
      ],
      materials: ['底框：按要求采用实木或胶合板层压件', '立柱与支撑：实木', '约束五金：按需配置捆扎环、螺栓固定件和防滑材料'],
      applications: ['外形不规则的超大工业机械', '带突出轴、管道或框架的设备', '尺寸或结构不适合封闭箱体的部件', '运输或交付时需要从侧面或顶部接近的货物'],
      handlingNotes: ['设计阶段须确认货物固定方式。', '确认允许堆码载荷；开放式框架通常不用于垂直堆码。', '设计阶段标明所有突出部件，以便正确布置支架。', '处理要求按目的地及适用法规确认。'],
      specificationLabels: { Structure: '结构', Entry: '进叉方式', 'Load capacity': '承载能力', Restraints: '约束装置', Treatment: '处理方式' },
    },
    'wooden-cable-reels': {
      name: '木制电缆盘',
      tagline: '为电缆搬运、储存和运输定制的木制盘具结构。',
      summary: 'KINGGOOD 生产由两侧法兰盘和实木中心筒体组成的木制电缆盘。盘具尺寸、筒径、法兰厚度及结构细节均依据每个项目的电缆类型、重量、放线方式和运输要求确定。',
      overview: '木制电缆盘由两个法兰盘和中部筒体构成。法兰采用交错铺设的多层实木板制造并加工至指定外径，设有中心轴孔和放线孔。筒体由围绕中心轴组装的实木条构成，并通过结构紧固件连接两侧法兰。',
      highlights: [
        { title: '按项目设计', description: '法兰直径、筒体长度、轴孔直径和木材等级根据电缆规格、装载总重及搬运设备选择。' },
        { title: '交错法兰结构', description: '法兰由多层实木板交错铺设，以保持尺寸稳定并减少滚动和放线时的开裂。' },
        { title: '适配放线设备', description: '在提供设备规格后，轴孔尺寸和法兰孔位可适配标准放线架主轴及放线设备。' },
      ],
      materials: ['法兰：交错多层实木板结构', '筒体条板：实木', '紧固件：按要求使用镀锌螺栓、拉杆和垫圈'],
      applications: ['电力基础设施用电力及高压电缆', '通信与光纤电缆', '工业软管和柔性导管', '海上或水下应用的铠装电缆与复合缆'],
      handlingNotes: ['设计阶段须说明最大装载重量和滚动条件。', '盘具应以法兰竖直状态存放，不要平放在法兰面上。', '运输中保护法兰边缘免受撞击，以防开裂。', '处理要求按目的地及适用法规确认。'],
      specificationLabels: { Construction: '结构', 'Flange diameter': '法兰直径', 'Barrel length': '筒体长度', 'Loaded weight': '装载重量', Treatment: '处理方式' },
    },
  },
  de: {
    'eu-standard-solid-wood-pallet': {
      name: 'Europäische Standard-Massivholzpalette',
      tagline: 'Robuste Massivholzkonstruktion für europäische und internationale Logistik.',
      summary: 'KINGGOOD fertigt Massivholzpaletten nach europäischen Standardmaßen aus kammergetrocknetem Holz der eigenen Lieferkette vom Stamm bis zur Montage. Behandlung und Exportdokumente werden nach Zielort und geltenden Einfuhrvorschriften abgestimmt.',
      overview: 'Diese Paletten entsprechen europäischen Standardgrundmaßen und bestehen aus Massivholzdeckbrettern mit Vierwege-Unterzügen. Brettstärke, Anzahl der Deckbretter und Unterzugmaße können innerhalb der konstruktiven Grenzen auftragsbezogen angepasst werden.',
      highlights: [
        { title: 'Massivholzkonstruktion', description: 'Kammergetrocknetes Massivholz bietet hohe Steifigkeit, Reparierbarkeit und lange Nutzungsdauer unter üblichen Lager- und Staplerbedingungen.' },
        { title: 'Konfigurierbare Behandlung', description: 'Art und Dokumentation der phytosanitären Behandlung werden nach Zielort und geltenden Einfuhrvorschriften festgelegt.' },
        { title: 'Reparierbar', description: 'Deckbretter und Unterzüge können einzeln ersetzt werden, was die Nutzungsdauer verlängert und Austauschkosten senkt.' },
      ],
      materials: ['Kammergetrocknetes Massivholz (Kiefer, Pappel oder gleichwertig)', 'Verzinkte oder Standardnägel und Befestiger nach Vorgabe', 'Behandlung: nach Zielort abgestimmt'],
      applications: ['Allgemeine Lagerung und Distribution', 'Exportkonsolidierung und Containerbeladung', 'Automatisierte Logistik- und Regalsysteme (maßabhängig)', 'Schwere Güter mit Bedarf an stabiler ebener Basis'],
      handlingNotes: ['Auf ebener, trockener Fläche lagern und lange Außenlagerung vermeiden.', 'Vor jeder Wiederverwendung auf beschädigte Bretter prüfen.', 'Gabelbreite und Anfahrtsrichtung müssen zur Einfahrkonfiguration passen.', 'Behandlungsanforderungen des Ziellands vor Bestellung klären.'],
      specificationLabels: { Construction: 'Konstruktion', Entry: 'Einfahrt', Footprint: 'Grundmaß', Treatment: 'Behandlung', 'Load capacity': 'Tragfähigkeit' },
    },
    'international-standard-plywood-pallet': {
      name: 'Internationale Standard-Sperrholzpalette',
      tagline: 'Technische Sperrholzplatten für Maßstabilität und geringeres Gewicht.',
      summary: 'Diese Paletten aus heißgepresstem Mehrschicht-Sperrholz bieten Maßstabilität, geringe Verformung und weniger Eigengewicht als vergleichbare Massivholzkonstruktionen. Exporttauglichkeit sowie erforderliche Behandlung oder Unterlagen werden je nach Zielort und Ladung projektbezogen bewertet.',
      overview: 'Das Palettendeck wird aus heißgepressten Mehrschichtplatten gefertigt, auf das vorgegebene Grundmaß zugeschnitten und mit Massivholz- oder Sperrholzklötzen montiert. Ebene Deckgeometrie und gleichmäßige Toleranzen eignen sich für automatisierte Förderlinien und Hochregallager.',
      highlights: [
        { title: 'Maßstabilität', description: 'Der mehrlagige Kreuzaufbau wirkt Verzug entgegen und hält die Deckfläche bei wechselnder Feuchte und Last eben.' },
        { title: 'Geringeres Gewicht', description: 'Die Sperrholzkonstruktion reduziert das Eigengewicht gegenüber Massivholz und damit das Gesamtgewicht je Sendung.' },
        { title: 'Präzise Bearbeitung', description: 'CNC-Zuschnitt und gleichmäßige Stärke unterstützen die Kompatibilität mit Standardstaplern, FTS und Regalsystemen.' },
      ],
      materials: ['Heißgepresste Mehrschichtplatten (Pappel, Birke oder gleichwertig)', 'Tragklötze: Massivholz oder Sperrholzlaminat nach Vorgabe', 'Klebstoffe: emissionsarme Klassen, sofern erforderlich'],
      applications: ['Automatisierte Lager und FTS-Systeme', 'Regalsysteme mit Bedarf an ebener, gleichmäßiger Deckfläche', 'Exportsendungen mit leichterer Palettenbasis', 'Distribution von Präzisionsgütern und Elektronik'],
      handlingNotes: ['Nicht schleifen oder fallen lassen, um Kantenablösung zu vermeiden.', 'Trocken lagern und längeren Kontakt mit stehendem Wasser vermeiden.', 'Behandlung und Dokumente werden nach Zielort und Vorschriften abgestimmt.', 'Plattenflächen und Klotzverbindungen vor jeder Wiederverwendung prüfen.'],
      specificationLabels: { Construction: 'Konstruktion', Entry: 'Einfahrt', Footprint: 'Grundmaß', Treatment: 'Behandlung', 'Load capacity': 'Tragfähigkeit' },
    },
    'custom-sized-pallet': {
      name: 'Palette nach Maß',
      tagline: 'Auf Ladung, Fördertechnik und Logistikanforderungen abgestimmt.',
      summary: 'Maßpaletten werden passend zu Ladungsgrundfläche, Kartonbild, Stapler- oder FTS-Daten, Regalmaßen, Linientakt und Innenmaßen von Container oder Lkw entwickelt. Enge Toleranzen reduzieren Verschieben, Verklemmen und Ladefehler in automatisierten Umgebungen.',
      overview: 'Wenn Standardgrößen ungenutzte Deckfläche, Überstand oder Konflikte mit Fördertechnik verursachen, lösen Maßpaletten diese Einschränkungen direkt. Bretter und Unterzüge werden nach Vorgabe bearbeitet; Toleranzen werden vorab auf die Anlage abgestimmt.',
      highlights: [
        { title: 'Passend für Ladung und Technik', description: 'Die Maße richten sich nach Ladungsgrundfläche, Kartonbild, Gabelabstand, FTS-Führung und Regalfach.' },
        { title: 'Container- und Lkw-Optimierung', description: 'Das Grundmaß wird aus den Innenmaßen von Lkw und Container berechnet, um die Beladung zu verbessern und Leerraum zu reduzieren.' },
        { title: 'Toleranzen für Automation', description: 'Enge Vorgaben für Ebenheit, Stärke und Rechtwinkligkeit unterstützen den stabilen Betrieb automatisierter und robotischer Linien.' },
      ],
      materials: ['Massivholz: Kiefer, Pappel oder gleichwertig nach Spezifikation', 'Sperrholzplatten: heißgepresste Mehrschichtausführung nach Vorgabe', 'Befestiger und Behandlung: projektbezogen abgestimmt'],
      applications: ['Automatisierte Produktionslinien und Roboterzellen', 'FTS-basierte Lager- und intelligente Logistiksysteme', 'Individuelle Regalfächer und Hochregallager', 'Lkw- und Containeroptimierung für bestimmte Ladungsbilder'],
      handlingNotes: ['Bei der Anfrage Gabelmaße und Anfahrtsrichtung angeben.', 'FTS-Spurweite und Sensorfreiräume in der Konstruktion bestätigen.', 'Behandlungsanforderungen nach Zielort abstimmen.', 'Zeichnung oder Muster können bei Bedarf vor Produktion freigegeben werden.'],
      specificationLabels: { Construction: 'Konstruktion', Dimensions: 'Abmessungen', Entry: 'Einfahrt', Tolerances: 'Toleranzen', Treatment: 'Behandlung' },
    },
    'solid-wood-crate': {
      name: 'Massivholzkiste',
      tagline: 'Hohe strukturelle Steifigkeit für schwere Maschinen und anspruchsvolle Exportbedingungen.',
      summary: 'Massivholzkisten verbinden Naturholz mit verstärkten Verbindungen zu einer steifen Konstruktion. Sie eignen sich für schwere Maschinen, Investitionsgüter und hochwertige Ladung, die beim multimodalen Export robust geschützt werden muss. Die tatsächliche Tragfähigkeit richtet sich nach der projektspezifisch bestätigten Konstruktion.',
      overview: 'Massivholzkisten bestehen aus Grundrahmen, senkrechten Eckpfosten und horizontalen oder diagonalen Wandteilen. Bretter werden je nach Last genagelt oder verschraubt; der Boden enthält Staplereinfahrten. Aufbau, Wandstärke und Brettmaße werden anhand von Ladungsgewicht, Stapelung und Handhabung festgelegt.',
      highlights: [
        { title: 'Strukturelle Steifigkeit', description: 'Massivholzrahmen und verstärkte Verbindungen widerstehen Druck, Verwindung und Stößen bei multimodaler Handhabung und Stapelung.' },
        { title: 'Anpassbarer Schutz', description: 'Feuchtigkeitsbeständige Auskleidung, Dämpfung und innere Stützen können auf Empfindlichkeit und Transportweg abgestimmt werden.' },
        { title: 'Vor Ort reparierbar und wiederverwendbar', description: 'Einzelne Platten und Bauteile können vor Ort ersetzt werden, sofern Konstruktion, Last und Handhabung dies zulassen.' },
      ],
      materials: ['Massivholzrahmen und Bretter (Kiefer oder gleichwertig)', 'Metallecken und Schraubverbindungen nach Vorgabe', 'Feuchtigkeitsbeständige Auskleidung, Schaum oder EPE nach Bedarf'],
      applications: ['Schwere Industriemaschinen und Investitionsgüter', 'Motoren, Kompressoren und große Baugruppen', 'Hochwertige Geräte mit hohem strukturellem Schutzbedarf', 'Multimodale Exportsendungen mit hohen Stapellasten'],
      handlingNotes: ['Hebemethode bei der Konstruktion angeben, damit Details passend ausgelegt werden.', 'Stapellast und Lagenzahl bei Bestellung bestätigen.', 'Behandlungsanforderungen für Exportziele nach geltenden Vorschriften abstimmen.', 'Kistenstruktur nach jedem Umschlag vor Wiederverwendung prüfen.'],
      specificationLabels: { Construction: 'Konstruktion', Joinery: 'Verbindung', 'Load capacity': 'Tragfähigkeit', 'Wall thickness': 'Wandstärke', Treatment: 'Behandlung' },
    },
    'plywood-crate': {
      name: 'Sperrholzkiste',
      tagline: 'Geringeres Gewicht, flexible Maße und effiziente Handhabung.',
      summary: 'Sperrholzkisten bieten eine geschlossene Konstruktion mit weniger Eigengewicht als vergleichbare Massivholzausführungen. Platten- und Gesamtmaße sind auch in überbreiten, überlangen und teilbaren Formaten anpassbar. Behandlungsanforderungen richten sich nach Material, Zielort und Einfuhrvorschriften.',
      overview: 'Sperrholzkisten bestehen aus einem Massivholz- oder Sperrholzrahmen mit Sperrholzflächen, die durch Metallclips, Nägel oder Durchgangsschrauben befestigt werden. Der Boden enthält Staplereinfahrten. Teilbare Konstruktionen erleichtern Montage, Demontage, Handhabung und Wiederverwendung.',
      highlights: [
        { title: 'Niedriges Eigengewicht', description: 'Technische Sperrholzplatten bilden eine geschlossene Konstruktion mit weniger Gewicht als Massivholz.' },
        { title: 'Flexible Abmessungen', description: 'Standard- und Sondermaße einschließlich überbreiter, überlanger und teilbarer Ausführungen sind möglich.' },
        { title: 'Glatte Plattenfläche', description: 'Ebene Sperrholzflächen eignen sich für Markierungen, Schablonen und Etiketten.' },
      ],
      materials: ['Sperrholzplatten: Lagenzahl, Klasse und Stärke nach Spezifikation', 'Rahmenteile: Massivholz oder Schichtholz', 'Metallclips, Nägel oder Schrauben nach Bedarf'],
      applications: ['Leichte bis mittelschwere Industriekomponenten', 'Stein, Fliesen und flache Güter mit Sondermaßen', 'Elektronik und Instrumente mit Bedarf an glatter Einhausung', 'Übermaßgüter mit teilbarer Konstruktion'],
      handlingNotes: ['Vorgesehene Handhabung in der Konstruktion angeben.', 'Stöße scharfer Kanten gegen Platten vermeiden, da sie Ablösung verursachen können.', 'Behandlungsanforderungen am Zielort vor Bestellung prüfen.', 'Teilbare Kisten in der vorgegebenen Reihenfolge montieren.'],
      specificationLabels: { Construction: 'Konstruktion', Fastening: 'Befestigung', 'Load capacity': 'Tragfähigkeit', 'Format options': 'Formate', Treatment: 'Behandlung' },
    },
    'open-frame-crate': {
      name: 'Offene Rahmenkiste',
      tagline: 'Zugängliche Rahmenstruktur für übergroße, unregelmäßige oder hervorstehende Ladung.',
      summary: 'Offene Rahmenkisten bestehen aus einem tragenden Grundrahmen und Eckpfosten ohne feste Seiten- oder Deckplatten. Dadurch kann unregelmäßige oder übergroße Ladung direkt verladen werden; hervorstehende Teile bleiben frei von starren Seitenwänden.',
      overview: 'Der tragende Grundrahmen wird aus Massivholz, Sperrholzlaminat oder einer Kombination gefertigt und enthält die erforderlichen Staplereinfahrten. Eckpfosten und Kreuzstreben halten die Außenkontur im Transport. Die Ladung wird mit Schraubhalterungen, rutschhemmenden Auflagen oder Zurrpunkten direkt am Grundrahmen befestigt.',
      highlights: [
        { title: 'Direkter Ladezugang', description: 'Ohne feste Seitenplatten kann von jeder Seite be- und entladen werden, ohne Wände zu demontieren.' },
        { title: 'Für unregelmäßige Formen', description: 'Der offene Rahmen passt zu unregelmäßigen Konturen, asymmetrischen Lasten und hervorstehenden Maschinenteilen.' },
        { title: 'Individuelle Halterungen', description: 'Rutschhemmung, Zurrösen, Ladungshalter und Sicherungspunkte werden passend zur Ladungsgeometrie in den Boden integriert.' },
      ],
      materials: ['Grundrahmen: Massivholz oder Sperrholzlaminat nach Vorgabe', 'Pfosten und Streben: Massivholz', 'Sicherungsteile: Zurrösen, Schraubhalter und rutschhemmendes Material nach Bedarf'],
      applications: ['Übergroße Industriemaschinen mit unregelmäßiger Kontur', 'Geräte mit hervorstehenden Wellen, Rohren oder Rahmen', 'Bauteile, die zu groß oder komplex für geschlossene Kisten sind', 'Ladung mit seitlichem oder oberem Zugang bei Transport oder Lieferung'],
      handlingNotes: ['Art der Ladungssicherung in der Konstruktion festlegen.', 'Zulässige Stapellast bestätigen; offene Rahmenkisten sind meist nicht für vertikale Stapelung ausgelegt.', 'Alle hervorstehenden Teile in der Konstruktion angeben, damit Halter richtig positioniert werden.', 'Behandlungsanforderungen nach Zielort und Vorschriften abstimmen.'],
      specificationLabels: { Structure: 'Struktur', Entry: 'Einfahrt', 'Load capacity': 'Tragfähigkeit', Restraints: 'Sicherungen', Treatment: 'Behandlung' },
    },
    'wooden-cable-reels': {
      name: 'Holzkabeltrommeln',
      tagline: 'Projektbezogene Holztrommeln für Handhabung, Lagerung und Transport von Kabeln.',
      summary: 'KINGGOOD fertigt Holzkabeltrommeln mit zwei Flanschen und einem Mittelkern aus Massivholz. Trommelmaße, Kerndurchmesser, Flanschstärke und Konstruktionsdetails werden nach Kabelart, Gewicht, Abrollverfahren und Transportanforderungen des Projekts bestimmt.',
      overview: 'Holzkabeltrommeln bestehen aus zwei Scheibenflanschen und einem mittleren Kern. Die Flansche werden aus kreuzweise geschichteten Massivholzbrettern auf Außendurchmesser bearbeitet und erhalten Kern- sowie Abrollöffnungen. Der Kern besteht aus massiven Dauben, die um die Achse montiert und mit konstruktiven Befestigern an beiden Flanschen fixiert werden.',
      highlights: [
        { title: 'Projektbezogene Auslegung', description: 'Flanschdurchmesser, Kernlänge, Achsbohrung und Holzklasse werden passend zu Kabeldaten, Gesamtgewicht und Handhabungsgerät gewählt.' },
        { title: 'Kreuzweise Flanschkonstruktion', description: 'Mehrlagig kreuzweise angeordnete Massivholzbretter verbessern Maßstabilität und reduzieren Spalten beim Rollen und Abwickeln.' },
        { title: 'Kompatibel mit Abrollgeräten', description: 'Achsbohrung und Lochbild werden anhand bereitgestellter Daten auf Standard-Trommelböcke und Abrolltechnik abgestimmt.' },
      ],
      materials: ['Flansche: kreuzweise geschichtete Massivholzbretter', 'Kerndauben: Massivholz', 'Befestiger: verzinkte Schrauben, Zugstangen und Scheiben nach Vorgabe'],
      applications: ['Strom- und Hochspannungskabel für Energieinfrastruktur', 'Telekommunikations- und Glasfaserkabel', 'Industrieschläuche und flexible Leitungen', 'Armierte Kabel und Versorgungsleitungen für Offshore- oder Unterwasseranwendungen'],
      handlingNotes: ['Maximales Ladegewicht und Rollbedingungen bei der Konstruktion angeben.', 'Trommeln aufrecht auf den Flanschkanten lagern, nicht flach auf der Flanschfläche.', 'Flanschkanten beim Transport vor Stößen schützen, um Spalten zu vermeiden.', 'Behandlungsanforderungen nach Zielort und Vorschriften abstimmen.'],
      specificationLabels: { Construction: 'Konstruktion', 'Flange diameter': 'Flanschdurchmesser', 'Barrel length': 'Kernlänge', 'Loaded weight': 'Ladegewicht', Treatment: 'Behandlung' },
    },
  },
  es: {
    'eu-standard-solid-wood-pallet': {
      name: 'Palé europeo estándar de madera maciza',
      tagline: 'Construcción robusta de madera maciza para logística europea e internacional.',
      summary: 'KINGGOOD fabrica palés de madera maciza con dimensiones estándar europeas a partir de madera secada en horno y procesada en nuestra cadena desde el tronco hasta el montaje. El tratamiento y la documentación de exportación se coordinan según el destino y la normativa de importación aplicable.',
      overview: 'Estos palés siguen las dimensiones de planta europeas y se fabrican con tablas de madera maciza y soportes de entrada por cuatro lados. El espesor, el número de tablas y las dimensiones de los soportes pueden ajustarse dentro de los límites estructurales de cada pedido.',
      highlights: [
        { title: 'Construcción de madera maciza', description: 'La madera secada en horno aporta rigidez estructural, facilidad de reparación y larga vida útil en condiciones habituales de almacén y carretilla.' },
        { title: 'Tratamiento configurable', description: 'El tipo de tratamiento fitosanitario y su documentación se confirman según el destino y la normativa aplicable.' },
        { title: 'Facilidad de reparación', description: 'Las tablas y los soportes pueden sustituirse por separado para prolongar el uso y reducir el coste de reposición.' },
      ],
      materials: ['Madera maciza secada en horno (pino, álamo o equivalente)', 'Clavos y fijaciones galvanizados o estándar según especificación', 'Tratamiento: confirmado según el destino'],
      applications: ['Almacenamiento y distribución general', 'Consolidación de exportaciones y carga de contenedores', 'Logística automatizada y sistemas de estanterías (según dimensiones)', 'Mercancías pesadas que requieren una base plana resistente'],
      handlingNotes: ['Almacenar sobre una superficie nivelada y seca; evitar la exposición exterior prolongada.', 'Revisar si hay tablas dañadas antes de cada reutilización.', 'La anchura de las horquillas y la dirección de entrada deben coincidir con la configuración.', 'Confirmar los requisitos de tratamiento del país de destino antes del pedido.'],
      specificationLabels: { Construction: 'Construcción', Entry: 'Entrada', Footprint: 'Dimensiones de planta', Treatment: 'Tratamiento', 'Load capacity': 'Capacidad de carga' },
    },
    'international-standard-plywood-pallet': {
      name: 'Palé internacional estándar de contrachapado',
      tagline: 'Paneles técnicos de contrachapado para estabilidad dimensional y menor peso.',
      summary: 'Fabricados con contrachapado multicapa prensado en caliente, estos palés ofrecen estabilidad dimensional, resistencia al alabeo y menor peso que una estructura equivalente de madera maciza. La aptitud para exportación y el tratamiento o los documentos necesarios se evalúan por proyecto según el destino y la carga.',
      overview: 'La plataforma se fabrica con paneles multicapa prensados en caliente, cortados a la planta especificada y montados con tacos de madera maciza o contrachapado. La superficie plana y las tolerancias uniformes resultan adecuadas para líneas automatizadas y almacenes verticales.',
      highlights: [
        { title: 'Estabilidad dimensional', description: 'La disposición multicapa cruzada reduce el alabeo y mantiene una geometría plana con cambios de humedad y carga.' },
        { title: 'Menor peso', description: 'La estructura de contrachapado reduce el peso propio frente a la madera maciza y el peso total del envío.' },
        { title: 'Mecanizado preciso', description: 'El corte CNC y el espesor uniforme favorecen la compatibilidad con carretillas, AGV y estanterías estándar.' },
      ],
      materials: ['Paneles multicapa prensados en caliente (álamo, abedul o equivalente)', 'Tacos: madera maciza o laminado de contrachapado según especificación', 'Adhesivos: clases de bajas emisiones cuando se requieran'],
      applications: ['Almacenes automatizados y sistemas AGV', 'Estanterías que requieren una plataforma plana y uniforme', 'Exportaciones que requieren una base de menor peso', 'Distribución de productos de precisión y electrónica'],
      handlingNotes: ['Evitar arrastrar o dejar caer el palé para prevenir la separación de bordes.', 'Almacenar en seco y evitar el contacto prolongado con agua estancada.', 'El tratamiento y la documentación se confirman según el destino y la normativa.', 'Revisar las caras de los paneles y las uniones antes de cada reutilización.'],
      specificationLabels: { Construction: 'Construcción', Entry: 'Entrada', Footprint: 'Dimensiones de planta', Treatment: 'Tratamiento', 'Load capacity': 'Capacidad de carga' },
    },
    'custom-sized-pallet': {
      name: 'Palé a medida',
      tagline: 'Configurado en torno a la carga, el equipo de manipulación y la logística.',
      summary: 'Los palés a medida se diseñan según la planta de la carga, la disposición de cajas, los datos de carretilla o AGV, las dimensiones de estantería, el paso de línea y el interior del contenedor o camión. Las tolerancias precisas reducen desplazamientos, atascos y fallos de carga en entornos automatizados.',
      overview: 'Cuando los tamaños estándar desperdician superficie, crean voladizos o no encajan con el equipo, un palé a medida resuelve esas limitaciones. Las tablas y soportes se mecanizan según dimensiones acordadas y las tolerancias se confirman para la línea.',
      highlights: [
        { title: 'Ajuste a la carga y al equipo', description: 'Las dimensiones se adaptan a la carga, disposición de cajas, separación de horquillas, guía AGV y huecos de estantería.' },
        { title: 'Optimización de contenedor y camión', description: 'La planta se calcula con las dimensiones interiores para mejorar la carga por vehículo y reducir espacio sin usar.' },
        { title: 'Tolerancias para automatización', description: 'La planitud, el espesor y la escuadra controlados favorecen el funcionamiento continuo de líneas automáticas y robotizadas.' },
      ],
      materials: ['Madera maciza: pino, álamo o equivalente según especificación', 'Paneles de contrachapado: multicapa prensada en caliente según grado requerido', 'Fijaciones y tratamiento: confirmados por proyecto'],
      applications: ['Líneas de producción automatizadas y células robotizadas', 'Almacenes con AGV y sistemas logísticos inteligentes', 'Huecos de estantería personalizados y almacenes verticales', 'Optimización de camiones y contenedores para cargas concretas'],
      handlingNotes: ['Indicar dimensiones y dirección de entrada de las horquillas al solicitar información.', 'Confirmar el ancho de vía del AGV y el espacio de sensores durante el diseño.', 'Los requisitos de tratamiento se confirman según el destino.', 'Puede aprobarse un plano o una muestra antes de producir cuando se requiera.'],
      specificationLabels: { Construction: 'Construcción', Dimensions: 'Dimensiones', Entry: 'Entrada', Tolerances: 'Tolerancias', Treatment: 'Tratamiento' },
    },
    'solid-wood-crate': {
      name: 'Caja de madera maciza',
      tagline: 'Alta rigidez estructural para maquinaria pesada y exportaciones exigentes.',
      summary: 'Las cajas de madera maciza combinan madera natural y uniones reforzadas para lograr alta rigidez. Son adecuadas para maquinaria pesada, bienes de equipo y cargas de alto valor que necesitan protección robusta durante la manipulación multimodal. La capacidad real depende de la especificación estructural confirmada para cada proyecto.',
      overview: 'La caja se compone de un bastidor base de madera maciza, postes verticales y elementos horizontales o diagonales. Los paneles se clavan o atornillan según la carga y la base integra entradas de carretilla. El diseño, el espesor de pared y las dimensiones se confirman según peso, apilado y método de manipulación.',
      highlights: [
        { title: 'Rigidez estructural', description: 'El bastidor macizo y las uniones reforzadas resisten compresión, deformación e impactos durante la manipulación y el apilado multimodal.' },
        { title: 'Protección configurable', description: 'Pueden especificarse revestimientos resistentes a la humedad, insertos amortiguadores y apoyos internos según la carga y la ruta.' },
        { title: 'Reparación y reutilización', description: 'Los paneles y elementos pueden sustituirse in situ cuando la estructura, la carga y la manipulación lo permitan.' },
      ],
      materials: ['Elementos de bastidor y paneles de madera maciza (pino o equivalente)', 'Esquineras metálicas y tornillos cuando se especifiquen', 'Revestimiento resistente a la humedad, espuma o EPE según necesidad'],
      applications: ['Maquinaria industrial pesada y bienes de equipo', 'Motores, compresores y grandes conjuntos mecánicos', 'Equipos de alto valor que requieren elevada protección estructural', 'Exportaciones multimodales con cargas de apilado importantes'],
      handlingNotes: ['Indicar el método de elevación durante el diseño para definir la estructura.', 'Confirmar carga y niveles de apilado al realizar el pedido.', 'Los requisitos de tratamiento para exportación se confirman según la normativa aplicable.', 'Revisar la integridad de la caja después de cada ciclo antes de reutilizarla.'],
      specificationLabels: { Construction: 'Construcción', Joinery: 'Uniones', 'Load capacity': 'Capacidad de carga', 'Wall thickness': 'Espesor de pared', Treatment: 'Tratamiento' },
    },
    'plywood-crate': {
      name: 'Caja de contrachapado',
      tagline: 'Menor peso, dimensiones flexibles y manipulación eficiente.',
      summary: 'Las cajas de contrachapado ofrecen un cerramiento estructural con menor peso propio que una construcción equivalente de madera maciza. Los paneles y dimensiones pueden personalizarse en formatos extraanchos, extralargos o desmontables. El tratamiento depende de los materiales, el destino y la normativa aplicable.',
      overview: 'Estas cajas combinan un bastidor de madera maciza o contrachapada con paneles fijados mediante clips metálicos, clavos o pernos pasantes. La base integra entradas para carretilla. La construcción desmontable facilita el montaje, desmontaje, manejo y posible reutilización.',
      highlights: [
        { title: 'Menor peso propio', description: 'Los paneles técnicos forman un cerramiento estructural con menos peso que la madera maciza.' },
        { title: 'Dimensiones flexibles', description: 'Se ofrecen medidas estándar y especiales, incluidos formatos extraanchos, extralargos y desmontables.' },
        { title: 'Superficie lisa', description: 'Los paneles planos facilitan el marcado, el estarcido y el etiquetado.' },
      ],
      materials: ['Paneles de contrachapado: capas, grado y espesor según especificación', 'Elementos del bastidor: madera maciza o laminada', 'Clips metálicos, clavos o pernos según necesidad'],
      applications: ['Componentes industriales ligeros o medianos', 'Piedra, baldosas y productos planos que requieren dimensiones especiales', 'Electrónica e instrumentos que requieren un cerramiento liso', 'Mercancías sobredimensionadas que requieren formato desmontable'],
      handlingNotes: ['Confirmar el método de manipulación previsto durante el diseño.', 'Evitar impactos de bordes afilados que puedan separar las capas.', 'Comprobar los requisitos de tratamiento del destino antes del pedido.', 'Montar las cajas desmontables según la secuencia indicada.'],
      specificationLabels: { Construction: 'Construcción', Fastening: 'Fijación', 'Load capacity': 'Capacidad de carga', 'Format options': 'Formatos', Treatment: 'Tratamiento' },
    },
    'open-frame-crate': {
      name: 'Caja de bastidor abierto',
      tagline: 'Acceso estructural para cargas grandes, irregulares o con salientes.',
      summary: 'Las cajas de bastidor abierto constan de una base portante y postes de esquina sin laterales ni tapa fijos. Permiten cargar directamente piezas irregulares o grandes que no caben en una caja convencional y alojar componentes salientes que podrían dañarse con paneles rígidos.',
      overview: 'El bastidor base se fabrica en madera maciza, laminado de contrachapado o una combinación, con la capacidad necesaria y entradas de carretilla. Los postes y arriostramientos mantienen la envolvente durante el transporte. La carga se fija a la base con pernos, material antideslizante o puntos de amarre.',
      highlights: [
        { title: 'Acceso directo de carga', description: 'Sin paneles fijos, la carga y descarga puede realizarse desde cualquier lado sin desmontar paredes.' },
        { title: 'Adaptada a formas irregulares', description: 'El bastidor abierto admite contornos irregulares, cargas asimétricas y piezas de maquinaria salientes.' },
        { title: 'Retenciones y soportes a medida', description: 'La base puede integrar almohadillas antideslizantes, anillas, soportes y fijaciones según la geometría de la carga.' },
      ],
      materials: ['Bastidor base: madera maciza o laminado de contrachapado según especificación', 'Postes y arriostramientos: madera maciza', 'Elementos de retención: anillas, pernos y material antideslizante según necesidad'],
      applications: ['Maquinaria industrial grande de contorno irregular', 'Equipos con ejes, tuberías o bastidores salientes', 'Componentes demasiado grandes o complejos para una caja cerrada', 'Cargas que requieren acceso lateral o superior durante transporte o entrega'],
      handlingNotes: ['Confirmar el método de fijación durante el diseño.', 'Confirmar la carga de apilado; estas cajas normalmente no se diseñan para apilado vertical.', 'Identificar todos los elementos salientes para situar correctamente los soportes.', 'Los requisitos de tratamiento se confirman según el destino y la normativa.'],
      specificationLabels: { Structure: 'Estructura', Entry: 'Entrada', 'Load capacity': 'Capacidad de carga', Restraints: 'Retenciones', Treatment: 'Tratamiento' },
    },
    'wooden-cable-reels': {
      name: 'Bobinas de cable de madera',
      tagline: 'Estructuras de madera diseñadas para manipular, almacenar y transportar cable.',
      summary: 'KINGGOOD fabrica bobinas de madera con dos discos laterales y un núcleo central de madera maciza. Las dimensiones, el diámetro del núcleo, el espesor de los discos y los detalles estructurales se especifican según el tipo y peso del cable, el método de desenrollado y el transporte.',
      overview: 'Las bobinas constan de dos discos laterales y un núcleo central. Los discos se fabrican con tablas macizas cruzadas, mecanizadas al diámetro exterior requerido y con orificio central y aberturas de desenrollado. El núcleo se forma con duelas macizas alrededor del eje y se une a ambos discos con fijaciones estructurales.',
      highlights: [
        { title: 'Diseño por proyecto', description: 'El diámetro de disco, la longitud y diámetro del núcleo y la clase de madera se eligen según el cable, el peso total y el equipo de manejo.' },
        { title: 'Discos de capas cruzadas', description: 'Las tablas macizas dispuestas en capas cruzadas mejoran la estabilidad y reducen las grietas al rodar o desenrollar.' },
        { title: 'Compatibilidad con equipos de desenrollado', description: 'El eje y el patrón de orificios se adaptan a soportes y equipos estándar cuando se facilitan sus datos.' },
      ],
      materials: ['Discos: tablas de madera maciza en capas cruzadas', 'Duelas del núcleo: madera maciza', 'Fijaciones: pernos, varillas y arandelas galvanizadas según especificación'],
      applications: ['Cables eléctricos y de alta tensión para infraestructuras', 'Cable de telecomunicaciones y fibra óptica', 'Mangueras industriales y conductos flexibles', 'Cable armado y umbilical para aplicaciones marinas o submarinas'],
      handlingNotes: ['Indicar el peso máximo cargado y las condiciones de rodadura durante el diseño.', 'Almacenar la bobina vertical sobre el borde de los discos, no plana sobre una cara.', 'Proteger los bordes de impactos durante el transporte para evitar grietas.', 'Los requisitos de tratamiento se confirman según el destino y la normativa.'],
      specificationLabels: { Construction: 'Construcción', 'Flange diameter': 'Diámetro del disco', 'Barrel length': 'Longitud del núcleo', 'Loaded weight': 'Peso cargado', Treatment: 'Tratamiento' },
    },
  },
}

function textOrFallback(value: string | undefined, fallback: string): string {
  return value?.trim() ? value : fallback
}

function localizedList(source: string[], translated: string[] | undefined): string[] {
  return source.map((item, index) => textOrFallback(translated?.[index], item))
}

function localizedHighlights(
  source: ProductHighlight[],
  translated: ProductHighlight[] | undefined,
): ProductHighlight[] {
  return source.map((item, index) => ({
    title: textOrFallback(translated?.[index]?.title, item.title),
    description: textOrFallback(translated?.[index]?.description, item.description),
  }))
}

export function localizeProduct(product: Product, locale: Locale): Product {
  const overlay = locale === 'en' ? undefined : productOverlays[locale][product.slug]

  return {
    ...product,
    gallery: [...product.gallery],
    name: textOrFallback(overlay?.name, product.name),
    tagline: textOrFallback(overlay?.tagline, product.tagline),
    summary: textOrFallback(overlay?.summary, product.summary),
    overview: textOrFallback(overlay?.overview, product.overview),
    highlights: localizedHighlights(product.highlights, overlay?.highlights),
    materials: localizedList(product.materials, overlay?.materials),
    applications: localizedList(product.applications, overlay?.applications),
    handlingNotes: localizedList(product.handlingNotes, overlay?.handlingNotes),
    specs: product.specs.map((specification) => ({
      label: textOrFallback(
        overlay?.specificationLabels[specification.label],
        specification.label,
      ),
      value: specification.value,
    })),
  }
}
