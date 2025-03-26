export default {
  header: {
    search: 'Search products',
    searchButton: 'Search',
    nav: {
      freightEstimate: 'Freight Estimate',
      transfer: 'Transfer',
      help: 'Help Center'
    },
    user: {
      profile: 'Profile',
      logout: 'Logout'
    }
  },
  menu: {
    myAccount: 'My Account',
    customers: 'My Customers',
    transferOrder: 'Transfer Orders',
    warehouse: 'My Warehouse',
    package: 'My Packages',
    assets: 'My Assets',
    addTransfer: 'Add Transfer',
    dashboard: 'Dashboard',
    settings: 'Settings',
    help: 'Help Center',
    notification: 'Notifications'
  },
  assets: {
    balance: {
      title: 'Available Balance (USD)',
      frozen: 'Frozen Amount',
      withdraw: 'Withdraw',
      recharge: 'Recharge',
      help: 'View Help'
    },
    transaction: {
      dateRange: {
        start: 'Start Date',
        end: 'End Date'
      },
      viewStatement: 'View Statement',
      table: {
        time: 'Time',
        type: 'Type',
        amount: 'Amount',
        balance: 'Balance',
        details: {
          orderNo: 'Order No',
          description: 'Description',
          paymentMethod: 'Payment Method',
          transactionNo: 'Transaction No'
        }
      }
    }
  },
  // ... 其他页面的翻译
  warehouse: {
    title: 'My Warehouse',
    table: {
      productInfo: 'Product Info',
      weight: 'Weight(g)',
      size: 'Size(cm)',
      quantity: 'Quantity',
      actions: 'Actions',
      details: 'Details'
    },
    product: {
      color: 'Color',
      size: 'Size'
    },
    bottomBar: {
      selectAll: 'Select All',
      selected: 'Selected',
      items: 'items',
      submit: 'Submit Transfer'
    }
  },
  package: {
    title: 'My Packages',
    status: {
      all: 'All',
      pending: 'Pending',
      inStock: 'In Stock',
      shipping: 'Shipping',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    },
    search: {
      placeholder: 'Order No.',
      button: 'Search'
    },
    table: {
      packageInfo: 'Package Info',
      packageNo: 'Package No.',
      submitTime: 'Submit Time',
      images: 'images',
      weight: 'Weight(g)',
      size: 'Size(cm)',
      status: 'Status',
      actions: 'Actions'
    }
  },
  transfer: {
    addOrder: {
      title: 'Add Transfer Order',
      backToList: 'Back to Orders',
      warehouse: {
        title: 'QC elf Warehouse Address',
        getAddress: 'Contact customer service for warehouse address',
        tip: 'Note: When sending to QC elf warehouse, please do not sign for express delivery on the spot, and the express number must correspond to the package one by one.'
      },
      form: {
        title: 'Shipping Information',
        noAddress: 'No Address',
        expressTitle: 'Express List',
        customCodePlaceholder: 'Please enter a custom code',
        customCode: 'Custom Code',
        customCodeHelp: 'Get Random User Code',
        recentAddress: 'Recent Address',
        addAddress: 'Add Address',
        trackingNumber: 'Express No.',
        value: 'Item Value(CNY)',
        photo: 'Item Photo',
        addExpress: 'Add Express No.',
        submit: 'Submit Transfer Order'
      }
    },
    submitTransfer: {
      steps: {
        selectProducts: 'Select Products',
        confirmInfo: 'Confirm Info',
        submitOrder: 'Submit Order'
      },
      productList: 'Product List',
      delivery: {
        title: 'Delivery Address',
        addNew: 'Add New Address'
      },
      shipping: {
        title: 'Shipping Method',
        standard: 'Standard',
        express: 'Express',
        economy: 'Economy'
      },
      packaging: {
        title: 'Packaging Service',
        none: 'No Additional Packaging',
        standard: 'Standard Packaging',
        gift: 'Gift Packaging'
      },
      summary: {
        subtotal: 'Subtotal',
        shipping: 'Shipping Fee',
        packaging: 'Packaging Fee',
        total: 'Total'
      }
    },
    list: {
      search: {
        customerCode: 'Customer Code',
        orderNo: 'Order No.',
        tag: 'Order Tag',
        status: 'Order Status',
        placeholder: {
          customerCode: 'Enter customer code',
          orderNo: 'Enter order number',
          tag: 'Please select',
          status: 'Please select'
        },
        reset: 'Reset',
        search: 'Search'
      },
      table: {
        productDetails: 'Product Details',
        customerCode: 'Customer Code',
        orderNo: 'Order No.',
        copy: 'Copy',
        recipientInfo: {
          name: 'Name',
          address: 'Address',
          zipCode: 'ZIP Code',
          phone: 'Phone',
          email: 'Email',
          country: 'Country'
        },
        productRemark: 'Product Remarks',
        editRemark: 'Edit Remarks',
        noRemark: 'No remarks',
        weightSize: 'Weight(g)/Size(cm)',
        orderStatus: 'Order Status',
        logisticsStatus: 'Logistics Status',
        trackingNo: 'Tracking No.',
        actions: 'Actions',
        share: 'Share'
      },
      status: {
        pending: 'Pending',
        inStock: 'In Stock',
        shipping: 'Shipping'
      }
    }
  },
  order: {
    title: 'My Orders',
    flow: {
      all: 'All',
      recorded: 'Recorded',
      qc: 'QC',
      shipped: 'Shipped',
      received: 'Received'
    },
    toolbar: {
      starred: 'Starred',
      trackingSearch: 'Search by Tracking No.',
      customerSearch: 'Search by Customer Code',
      shared: 'Shared/Unshared'
    },
    card: {
      trackingNo: 'Tracking No.',
      customerCode: 'Customer Code',
      recordDate: 'Record Date',
      latestTracking: 'Latest Tracking',
      star: 'Star',
      share: 'Share',
      sharedTimes: 'Shared {count} times'
    },
    orderSelectTip: 'Please select at least one order',
    orderNotSameUserTip: 'Only orders from the same customer can be shipped together. Please filter by userNO before one click shipping'
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
     servicePrice: "服务费",
     submitOrderTip1: "请选择收货地址",
     packagingMethodTip: "请选择包装方式！",
     lineSelectTip: "请选择寄送线路！",
     declarationValueTip: "请填写包裹申报总价值",
     sumbitSuccess: "订单提交成功",
     langProp: "Trans",
     warehouse_submit_tip: "If you have any other requirements for the package, please note here",
    }
} 