export default {
  commont: {
    edit: '编辑',
    share: '分享',
    createTime: '创建时间',
    operation: '操作',
    total: '共',
    page: '条',
  },
  routes: {
    Home: '首页',
    Login: '登录',
    Forget: '找回密码',
    Register: '注册',
    AddTransfer: '添加订单',
    OrderShareList: '我的订单',
    Estimate: '运费预估',
    ShareOrder: '订单详情',
    Pay: '支付',
    PaySuccess: '支付成功',
    Article: '内容详情',
    ArticleList: '帮助中心',
    Users: '用户管理',
    LoginLogs: '登录日志',
    TransferList: '我的转运列表',
    Warehouse: '我的仓库',
    Package: '我的包裹',
    PackageDetail: '包裹详情',
    MyAssets: '我的资产',
    SubmitTransfer: '提交转运',
    OrderList: '我的订单',
    CustomerList: '我的客户',
    Profile: '个人中心',
    Ticket: '我的工单',
  },
  header: {
    search: '请输入商品关键词',
    searchButton: '搜索',
    login: '登录',
    register: '注册',
    nav: {
      freightEstimate: '运费预估',
      transfer: '添加订单',
      help: '帮助中心'
    },
    user: {
      profile: '个人资料',
      customers: '我的客户',
      wallet: '我的资产',
      orders: '我的订单',
      ticket: '我的工单',
      logout: '退出登录'
    }
  },
  bottom: {
    customerService: '客户服务',
    customerServiceList: {
      helpCenter: '帮助中心',
      contactUs: '联系我们',
      aboutUs: '关于我们'
    },
    warehouseCorrelation: '仓库相关',
    warehouseCorrelationList: {
      freeQualityInspection: '免费质检',
      freeStorage: '免费仓储',
    },
    logisticsCorrelation: '物流相关',
    logisticsCorrelationList: {
      insuranceService: '保险服务',
      mailingRestriction: '邮寄限制',
      mailingPolicy: '邮寄政策',
    }
  },
  home: {
    serviceIntroduction: '服务介绍',
    WarehouseTour: '仓库导览',
    ExploreOur: '探索我们的智能仓储设施',
    QcInspection: 'QC 质检',
    SmartPackaging: '智能打包',
    customerManagement: '客户管理',
    logisticsInsurance: '物流保险',
    immediateUse: '立即使用',
    EnableIntelligent: '开启智能物流服务',
  },
  menu: {
    profile: '个人中心',
    myAccount: '会员中心',
    customers: '我的客户',
    transferOrder: '我的订单',
    warehouse: '我的仓库',
    package: '我的包裹',
    assets: '我的资产',
    addTransfer: '添加订单',
    dashboard: '控制台',
    settings: '系统设置',
    help: '帮助中心',
    notification: '消息通知',
    ticket: '我的工单'
  },
  customers: {
    add: '添加客户信息',
    code: '客户编码',
    codeHelp: '客户编码说明',
    info: {
      title: '客户信息',
      name: '姓名',
      postcode: '邮编',
      phoneNumber: '手机号码',
      email: '邮箱',
      address: '地址',
    },
    orderCount: '订单数',
    addressHelp: '客户地址说明',
    createTime: '添加日期',
    operation: '操作',
  },
  assets: {
    balance: {
      title: '可用余额 ',
      frozen: '不可提现',
      withdraw: '提现',
      recharge: '充值',
      help: "充值意味着你可以充值一些钱到你的账户钱包，直接使用余额支付可以给你节省时间。",
      rechargeMoney: "充值金额",
      inputPlaceholder: "请输入",
      rechargeIptTip: "请输入充值金额",
      arrears: "欠款",
      arrearsTip:
          "欠款指的是您未支付/未补款但我们优先帮您处理以免耽误时效的包裹费用、订单退换货运费或者是货到付款等费用。请及时偿还欠款，否则下次无法交易。",
      paymentOfArrears: "偿还欠款",
      arrears_records: "欠款记录"
    },
    transaction: {
      dateRange: {
        start: '开始日期',
        end: '结束日期',
        separator: '至'
      },
      viewStatement: '查看账单',
      balanceDetails: '余额明细',
      table: {
        time: '交易时间',
        type: '类型',
        amount: '收入/支出',
        amount2: '金额',
        balance: '账号余额',
        serviceNumber: "业务编号",
        options: "操作",
        repaymented: "已还清",
        details: {
          orderNo: '订单编号',
          description: '交易说明',
          paymentMethod: '支付方式',
          transactionNo: '交易流水号'
        }
      }
    }
  },
  // ... 其他页面的翻译

  // 仓库相关
  warehouse: {
    title: '我的仓库',
    table: {
      productInfo: '商品信息',
      weight: '重量(g)',
      size: '尺寸(cm)',
      quantity: '数量',
      actions: '操作',
      details: '详情'
    },
    product: {
      color: '颜色',
      size: '尺码'
    },
    bottomBar: {
      selectAll: '全选',
      selected: '选中商品总计',
      items: '个',
      submit: '提交运送'
    }
  },

  // 包裹相关
  package: {
    title: '我的包裹',
    status: {
      all: '全部',
      recorded: '已录入',
      qc: '已QC',
      waitPay: '待支付',
      processing: '待发货',
      delivered: '已发货',
      finished: '已签收'
    },
    search: {
      placeholder: '订单编号',
      button: '搜索'
    },
    table: {
      customerCode: '客户编码' ,
      addressInfo: '地址信息' ,
      expressDelivery: '快递信息',
      latestStatus: '最新状态',
      trackingNumber: '快递单号',
      logisticsTrack: '物流轨迹',
      detail: '包裹详情',
      goPay: '去支付',
      cancelPackage: "取消包裹",
      packageInfo: '包裹信息',
      estimateSize: '预估尺寸',
      realSize: '实际尺寸',
      estimateWeight: '预估重量',
      realWeight: '实际重量',
      estimateFreight: '预估费用',
      realFreight: '实际费用',
      insuranceFee: '保险费',
      declarationPrice: '申报货值',
      package_bk_order_status_tip: "您包裹的实际重量比预计重量重，请支付差额",
      sending_country: "寄送国家",

    },
    specialFocus: '特别关注',
    cancelSpecialFocus: '取消特别关注',
    oneClickDelivery: '一键发货',
  },
  //添加/编辑地址相关
  addTransfer: {
    button: '复制地址信息',
    contacts: '联系人',
    tel: '联系方式',
    address: '收货地址'
  },
  addressForm: {
    title: '添加/修改客户信息',
    
    customerCode: '客户编码',
    customerCodeTip: '请输入用户编码',
    country: '国家',
    countryTip: '请填写国家',
    province: '省份',
    provinceTip: '请填写省份',
    city: '城市',
    cityTip: '请填写城市',
    postCode: '邮编',
    postCodeTip: '请填写邮编',
    email: '邮箱',
    emailTip: '请填写邮箱',
    phoneNumber: '手机号码',
    phoneNumberTip: '请填写手机号码',
    name: '姓名',
    nameTip: '请填写姓名',
    address: '详细地址',
    addressTip: '请填写详细地址',
    customCodeRandom: '获取随机编码',
  },
  // 转运相关
  transfer: {
    addOrder: {
      title: '添加订单',
      title2: '添加新订单',
      order: '订单',
      backToList: '返回我的订单',
      deleteOrder: '删除此订单',
      deleteOp: '删除',
      warehouse: {
        title: 'QC elf仓库地址',
        getAddress: '请联系客服获取仓库地址',
        tip: '温馨提示：如果您想要寄到QC elf仓库，请不要把快递当场签收，快递号要和包裹一一对应。'
      },
      form: {
        title: '寄送信息',
        noAddress: '暂无地址',
        expressTitle: '快递单号列表',
        customCodePlaceholder: '请输入自定义编码',
        customCode: '自定义编码',
        customCodeHelp: '获取随机用户编码',
        recentAddress: '最近地址',
        addAddress: '新增地址信息',
        editAddress: '编辑地址信息',
        trackingNumber: '快递单号',
        value: '物品价值(CNY)',
        photo: '商品照片',
        addExpress: '添加快递单号',
        submit: '提交订单'
      }
    },
    submitTransfer: {
      steps: {
        selectProducts: '选择商品',
        confirmInfo: '确认信息',
        submitOrder: '提交订单'
      },
      productList: '商品清单',
      delivery: {
        title: '收货地址',
        addNew: '添加新地址'
      },
      shipping: {
        title: '运输方式',
        standard: '标准快递',
        express: '特快专递',
        economy: '经济方式'
      },
      packaging: {
        title: '包装服务',
        none: '无需额外包装',
        standard: '标准包装',
        gift: '礼品包装'
      },
      summary: {
        subtotal: '商品小计',
        shipping: '运费',
        packaging: '包装费',
        total: '总计'
      }
    },
    list: {
      search: {
        customerCode: '客户编号',
        orderNo: '订单编号',
        tag: '订单标签',
        status: '订单状态',
        placeholder: {
          customerCode: '请输入客户编号',
          orderNo: '请输入订单编号',
          tag: '请选择',
          status: '请选择'
        },
        reset: '重置',
        search: '搜索'
      },
      table: {
        productDetails: '商品详情',
        customerCode: '客户编号',
        orderNo: '订单编号',
        copy: '复制',
        recipientInfo: {
          name: '姓名',
          address: '地址',
          zipCode: '邮编',
          phone: '手机号',
          email: '邮箱',
          country: '国家'
        },
        productRemark: '商品备注信息',
        editRemark: '编辑备注',
        noRemark: '暂无备注',
        weightSize: '重量(g)/尺寸(cm)',
        orderStatus: '订单状态',
        logisticsStatus: '物流状态',
        trackingNo: '物流单号',
        actions: '操作',
        share: '分享'
      },
      status: {
        pending: '待入库',
        inStock: '已入库',
        shipping: '运输中'
      }
    }
  },

  order: {
    title: '我的订单',
    flow: {
      all: '全部',
      recorded: '已录入',
      qc: 'QC',
      shipped: '已发货',
      received: '已签收'
    },
    toolbar: {
      starred: '特别关注',
      trackingSearch: '快递单号搜索',
      customerSearch: '客户编码搜索',
      shared: '已分享/未分享',
    },
    card: {
      trackingNo: '快递单号',
      trackingNo2: '国际单号',
      customerCode: '客户编码',
      recordDate: '录入日期',
      latestTracking: '最新轨迹',
      star: '特别关注',
      share: '分享',
      sharedTimes: '已分享{count}次',
      sendLine: "物流线路",
    },
    orderSelectTip: '请选择订单',
    orderNotSameUserTip: '同一客户订单才能一起发货，请按用户编号筛选后再一键发货'
  },

  submit: {
   subMitYunOrder: "提交运单",
   address: "收货地址",
   default: "默认",
   commodity_list: "商品清单",
   orderNo: "订单编号",
   day: "天",
   warehouseSaveTip: "您的商品会在Qcelf仓库免费储存90个自然日",
   packagingMethod: "包装方式",
   packagingMethod1: "纸箱包装",
   packagingMethod2: "极简包装",
   packagingMethodTip: "请选择包装方式！",
   paidServices: "付费服务",
   paidServicesTip: "纸箱包装无需额外支付包装费用",
   freeServicesTip: "极简包装无需额外支付包装费用",
   freeServices: "免费服务",
   addedService: "增值服务",
   addedServiceCharge: "增值服务费",
   addService1: "拉伸膜",
   addServiceTip1:
     "增值服务项，CN￥10\n服务描述：在纸箱包裹外表面进行拉伸膜全覆盖。\n使用场景：使用拉伸膜打包包裹，可有效防潮、防水、防偷换。全品类商品都可使用。",
   addService2: "EPE泡沫填充物",
   addServiceTip2:
     "增值服务项，CN￥10\n服务描述：在纸箱四面内壁缝隙中填充EPE泡沫填充物，系统根据商品重量自动计算服务费。\n服务特点：使用泡沫板对包裹内空间进行填充保护，极大地避免商品因颠簸而造成的损坏。适用于小型电器类商品，搭配使用纸护角卡条效果更佳。",
   addService3: "纸护角卡条",
   addServiceTip3:
     "增值服务项，CN￥20\n服务描述：在纸箱包裹外边缘添加四条护角卡条。\n使用场景：多使用于对商品原包装有要求的商品，例如手办外包装，保证八角尖尖，盒控必选。",
   addService4: "真空压缩袋",
   addServiceTip4:
     "增值服务项，CN￥15\n服务描述：使用真空压缩袋对整个包裹内的商品集中进行真空压缩，最大压缩袋容积为80cm*60cm。\n服务特点：可极大程度上压缩体积，节省体积线路的运费；并有一定的防潮、防霉、防尘、防虫作用。推荐在羽绒服、床上用品、家居纺织品等轻抛纺织类商品上使用。",
   addService5: "包装过程视频",
   addServiceTip5:
     "增值服务项，CN￥8\n服务描述：提供包裹的全程打包视频，便于您更直观的感受到整个包装过程，满足您需要查看包裹包装状态的需求。\n包裹打包完成的30分钟后可以在“我的包裹”页面查看打包视频；视频将为您保留30天。\n如何购买:提交包裹选择寄送线路后，选择运单增值服务【包装过程视频】购买",
   addService6: "防潮袋",
   addServiceTip6:
     "增值服务项，CN￥6\n服务描述：在纸箱包裹外表面添加套上防潮袋并做好密封。\n服务特点：加厚PE材质，可有效防止包裹在运输途中因天气等因素引发外箱受潮、内件发霉的情况。全品类商品都可使用。",
   addService7: "商品加固-气泡柱包装",
   addServiceTip7:
     "增值服务项，CN￥15\n（1）功能：使用气泡柱卷材对商品进行包裹保护，可较大程度提高商品抗震能力，防止商品因挤压、碰撞、跌落而损坏。\n（2）适用品类：化妆品、电子产品、手办、玻璃罐装、陶瓷制品。",
   addService8: "商品加固-牛皮气泡袋包装",
   addServiceTip8:
     "增值服务项，CN￥10\n（1）功能：使用牛皮气泡袋包装商品，具有缓冲防震作用，防止商品因挤压、碰撞、跌落而损坏。\n（2）适用品类：适用于小件首饰、小件玉器、驾驶证/身份证类小本证件、小型电子产品。",
   addService9: "商品加固-珍珠棉包装",
   addServiceTip9:
     "增值服务项，CN￥10\n（1）功能：使用珍珠棉对商品进行三层包裹，具有缓冲防震作用，防止商品因挤压、碰撞、跌落而损坏。\n（2）适用品类：各种带商品盒子的易折损商品均可使用。",
   addService10: "商品加固-防尘袋包装",
   addServiceTip10:
     "增值服务项，CN￥10\n（1）功能：使用防尘袋包装商品，具有防尘、防剐蹭、防潮、防商品受日光久晒变色等优点。\n（2）适用品类：适用于衣帽鞋包类商品。",
   addService11: "商品加固-充气鞋撑",
   addServiceTip11: "增值服务项，CN￥1\n用于支撑鞋子内部，保护鞋子不变形",
   addService12: "商品加固-环保木浆鞋撑",
   addServiceTip12: "增值服务项，CN￥10\n用于支撑鞋子内部，保护鞋子不变形",
   remark: "备注",
   sendLine: "寄送线路",
   noInsuranceTip: "温馨提示：转运订单无法享受免费保险。如需购买保险，请联系客服。",
   taxExemption: "免税",
   ShippingTime: "运输时效",
   select: "选择",
   changeLine: "修改线路",
   estTip15: "计费标准",
   taxPaymentMethod: "缴税方式",
   recipientPays1: "收件人缴纳",
   recipientPays2: "免税",
   recipientPaysTip: "包裹到目的国后，可能需要您缴纳税金。请以海关或承运商通知为准，如果您的包裹被税请配合缴纳税金，以便包裹顺利送达您手中。",
   declarationMethod: "申报方式",
   declarationMethod1: "系统申报",
   declarationMethod2: "自主申报",
   declarationCurrency: "申报币种",
   declarationMethod1Tip: "根据贵国最新海关要求，平台建议包裹的申报金额为总货值的%s。系统申报仅作参考，您可以在【自主申报】板块填写您认为合适的申报货值。",
   declarationValue: "包裹申报总价值",
   estimatTaxesFee: "预收税费",
   disclaimerReminder: "物流免责提醒",
   waybill_logistics_tips: "1. 包裹在目的国海关清关时，如被抽查，可能存在被征税的风险。如您有收到征税通知，请积极协助清关，否则可能会产生高额的退件费。\n2. 包裹派送均由第三方物流商承运，如包裹发生丢失，Qcelf可代用户与第三方物流承运商协调赔偿事宜。",
   noLineData: "暂无匹配的物流干线",
   pre_package_weight: "包裹预估重量",
   package_weight: "预估包裹重量",
   package_weight3: "预估包裹体积重",
   package_weight3Tip: "该条线路会取包裹实重与体积重中较大者作为包裹重量来计算运费",
   estimateFreight: "预估运费",
   addedServiceCharge: "增值服务费",
   carrierProcessingFee: "物流商处理费",
   fuelCharge: "燃油费",
   operationFee: "操作费",
   servicePrice: "服务费",
   memberDiscount: "会员折扣",
   memberDiscountAmountTip: "会员折扣是基于用户使用优惠券折扣后的金额，再进行折上折，计算您会员等级对应的优惠。",
   exclusiveDiscount: "专属折扣",
   exclusiveDiscountAmountTip: "专属折扣是基于用户使用优惠券折扣后的金额，再进行折上折，计算您会员等级对应的优惠。",
   estimatTaxesFee: "预收税费",
   estimatTaxesFeeAmountTip: "根据政策要求，贵国对中国进口商品征收关税+商品税。我们根据估计预先收取相应的税款，并根据实际后续税费退还任何多余款项或要求您补足剩余款项。",
   submit_package: "提交包裹",
   global_cancel: "取消",
   gloabl_confirm: "确认",
   order_table_detail: "商品详情",
   order_table_price: "单价",
   order_table_num: "数量",
   product_type: "商品类型",
   warehouse_createTime: "入库时间",
   weight: "重量(g)",
   size: "尺寸(cm)",
   freight: "运费",
   freight2: "运费",
   tariff: "关税",
   firstWeightPrice: "首重价格",
   additionalWeightPrice: "续重价格",
   carrierProcessingFee: "物流商处理费",
   fuelCharge: "燃油费",
   operationFee: "操作费",
   insuranceFee: "保险费",
   servicePrice: "服务费",
   submitOrderTip1: "请选择收货地址",
   packagingMethodTip: "请选择包装方式！",
   lineSelectTip: "请选择寄送线路！",
   declarationValueTip: "请填写包裹申报总价值",
   sumbitSuccess: "订单提交成功",
   langProp: "",
   warehouse_submit_tip: "如果您对包裹还有其他要求，请在这里备注",
   service_charge: "服务费",
   insurancePaymentMethod: "保险",
   insurancePaymentMethod1: "购买",
   insurancePaymentMethod2: "不需要",
   insurancePaymentMethodTip1:
       "这条线路为您的包裹提供免费保险，如需了解详情，请咨询客服，或点击线路图标上的保险按钮。",
   insurancePaymentMethodTip2:
       "如果您投保的包裹符合以下条件，我们将根据实际情况进行赔偿。最高赔偿金额为左侧商品保险金额加运费保险金额之和(不超过5000元)。物流公司确认你的包裹被海关扣押了。\n海关扣押赔偿可在包裹发出后45-60天内申请。有关赔偿标准，请咨询我们的在线客服。",
  },
  estimate: {
   PackageRestrictions: "包裹限制",
   estTip9: "最低重量限制:",
   estTip10: "最高重量限制:",
   estTip11: "尺寸限制:",
   estTip12: "体积计费规则:",
   estTip13: "不可寄送",
   estTip14: "可寄送",
   estTip15: "计费标准",
   NotYetDelivered: "暂未妥投",
   firstWeightPrice: "首重价格",
   additionalWeightPrice: "续重价格",
   carrierProcessingFee: "物流商处理费",
   fuelCharge: "燃油费",
   operationFee: "操作费",
   insuranceFee: "保险费",
   servicePrice: "服务费",
   ShippingCostEstimate: "运费估算",
   estTip1: "输入包裹尺寸（长、宽、高）后计算更精准",
   WarehouseTo: "Qcelf仓库寄往",
   selectCountry: "选择国家",
   weight: "重量(g)",
   pleaseInputWeight: "请输入重量",
   selectPlaceholder: "请选择",
   ProductTypes: "商品类型",
   long: "长",
   width: "宽",
   height: "高",
   Inquire: "查询",
   estTip2: "所有非Qcelf自营线路的物流服务均由第三方物流商提供，并且他们会根据市场行情调整运费价格，如有价格波动Qcelf会提前通知。为提供最大限度的服务体验，如您在物流服务上遇到到问题，Qcelf可代您与第三方物流商协商沟通。",
   taxExemption: "免税",
   TransportationCosts: "运输费用",
   ShippingTime: "运输时效",
   dayText: "天",
   lookDetail: "查看详情",
   pack_up: "收起",
   UnavailableReason: "不可用原因",
   estTip4: "请输入对应参数，查询运费！",
   please_select_country: "请选择国家",
   pleaseInputWeight: "请输入重量",
   countryHot: "热门",
  },
  pay: {
    mine_cart_orderPay_nav: "收银台",
    payMode: "支付方式",
    Balance: "余额",
    balanceOverTip: "您的余额不足，请先充值后再进行支付",
    globalRecharge: "充值",
    Alipay: "支付宝",
    alipayTip: "",
    payAmount: "实际应付金额",
    property_recharge_money: "充值金额",
    orderAmount: "应付总额",
    handCharge: "手续费",
    cancelRecharge: "取消充值",
    cancel_pay: "取消支付",
    property_recharge_title: "充值",
    confirmPay: "确认付款",
    common_please_select_channel: "请选择支付方式",
    rechargeSuccess: "充值成功",
    paySuccess: "支付成功",
    paySuccessTip2: "您的包裹火速运输中，请耐心等待，包裹状态可通过物流单号查询跟踪。",
    paySuccessTip: "谢谢您的惠顾!",
    goback_assets: "返回我的资产",
    viewOrder: "查看订单",
    payFail: "支付失败",
    payResult: "支付结果",
    paypalTip:
        "PayPal 作为备受信赖的电子钱包，在200 多个国家拥有超4 亿活跃用户，是名副其实的全球服务供应商。携手PayPal，Qcelf让您拥有快速安全的付款体验。",
    notApplyPayTip: "该支付方式不支持人民币，请切换币种或选择另一支付方式",
  },
  profile: {
    email: '邮箱地址',
    nickname: '昵称',
    phone: '手机号码'
  },
  login: {
    tip1: '中国购物，递送全球',
    tip2: '免费保险',
    tip3: '保证您的资金安全',
    tip4: '7*12客服',
    tip5: '全球覆盖',
    tip6: '100+航运公司',
    tip7: '可靠的售后服务',
    login: '登录',
    email: '电子邮箱',
    password: '密码',
    forgotPassword: '忘记密码?',
    register: '注册',
    success: '登陆成功',
    fail: '登陆失败',
    accountSecurity: '找回密码',
    emailTip1: '请输入您绑定的邮箱',
    emailCodeTip: '请输入邮箱验证吗',
    getEmailCode: '获取验证码',
    passwordTip1: '请输入重置密码',
    passwordConfirm: '确认密码',
    confirm: '确定',
    haveAccount: '已有账号？',
    login2: '去登录',
    emailTip2: '邮箱(请填写真实可用的邮箱)',
    name1: '请填写姓氏',
    name2: '请填写名字',
    agree: '我已阅读并同意',
    agreement: '用户注册协议'
  },
  ticket: {
    keywordPlaceholder: '请输入标题关键词',
    statusPlaceholder: '请选择工单状态',
    add: '新增工单',
    statusItem: {
         submitted: '已提交',
         processing: '处理中',
         completed: '已完结'
    },
    title: '工单标题',
    status: '工单状态',
    view: '查看',
    msgTip: '您有新的消息',
    ticketForm: {
       title: '新增工单',
       titleLabel: '工单标题',
       contentLabel: '问题描述',
       titlePlaceholder: '请输入工单标题',
       contentPlaceholder: '请输入反馈问题描述'
    },
    ticketDetailForm: {
       title: '工单详情',
       contentLabel: '',
       contentPlaceholder: '请输入回复内容',

    }

  }

} 