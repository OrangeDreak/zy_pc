export default {
  commont: {
    edit: 'Edit',
    share: 'Share',
    createTime: 'Create Time',
    operation: 'Operation',
    total: 'total',
    page: 'page',
  },
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
    profile: 'Profile',
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
  customers: {
    add: 'Add Customers',
    code: 'Customers Code',
    info: {
      title: 'Customers Info',
      name: 'name',
      postcode: 'postcode',
      phoneNumber: 'phone number',
      email: 'emial',
      address: 'address',
    },
    orderCount: 'Order Count',
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
        end: 'End Date',
        separator: 'Separator'
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
  //添加/编辑地址相关
  addressForm: {
    title: 'Add/Edit Customer Info',
    customerCode: 'Customer Code',
    customerCodeTip: 'please enter Customer Code',
    country: 'Country',
    countryTip: 'please selecte Country',
    province: 'Province',
    provinceTip: 'please selecte Province',
    city: 'City',
    cityTip: 'please selecte City',
    postCode: 'PostCode',
    postCodeTip: 'please enter PostCode',
    email: 'Email',
    emailTip: 'please enter Email',
    phoneNumber: 'Phone Number',
    phoneNumberTip: 'please enter phoneNumber',
    name: 'name',
    nameTip: 'please enter Name',
    address: 'address',
    addressTip: 'please enter Address',
    customCodeRandom: 'Get Random Code',
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
      all: 'ALL',
      recorded: 'RECORDED',
      qc: 'QC',
      waitPay: 'WAITPAY',
      processing: 'PROCESSING',
      delivered: 'DELIVERED',
      finished: 'FINISHED'
    },
    table: {
      customerCode: 'customer Code' ,
      addressInfo: 'Address info' ,
      expressDelivery: 'Express Delivery',
      latestStatus: 'Latest Status',
      trackingNumber: 'Tracking Number',
      logisticsTrack: 'Logistics Track',
    },
    search: {
      placeholder: 'Order No.',
      button: 'Search'
    },
    specialFocus: 'Special Focus',
    cancelSpecialFocus: 'Cancel Special Focus',
    oneClickDelivery: 'One Click Delivery',
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
        editAddress: 'Edit Address',
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
      subMitYunOrder: "Submit Shipping Order",
      address: "Delivery Address",
      default: "Default",
      commodity_list: "Product List",
      orderNo: "Order Number",
      day: "day(s)",
      warehouseSaveTip: "Your items will be stored free of charge at Qcelf warehouse for 90 calendar days",
      packagingMethod: "Packaging Method",
      packagingMethod1: "Carton Packaging",
      packagingMethod2: "Minimalist Packaging",
      packagingMethodTip: "Please select a packaging method!",
      paidServices: "Paid Services",
      paidServicesTip: "No additional packaging fees for carton packaging",
      freeServicesTip: "No additional packaging fees for minimalist packaging",
      freeServices: "Free Services",
      addedService: "Value-added Services",
      addedServiceCharge: "Value-added Service Fee",
      addService1: "Stretch Film",
      addServiceTip1: "Value-added service, CN￥10\nService description: Full coverage of stretch film on the outer surface of carton packages.\nUsage scenario: Using stretch film to pack packages can effectively prevent moisture, water, and tampering. Suitable for all product categories.",
      addService2: "EPE Foam Filler",
      addServiceTip2: "Value-added service, CN￥10\nService description: Fill the gaps on the four inner walls of the carton with EPE foam filler. The system automatically calculates the service fee based on the product weight.\nService features: Using foam boards to fill and protect the internal space of the package greatly prevents damage caused by jolting. Suitable for small appliances, with better results when used with paper corner protectors.",
      addService3: "Paper Corner Protectors",
      addServiceTip3: "Value-added service, CN￥20\nService description: Add four corner protector strips to the outer edges of the carton package.\nUsage scenario: Mostly used for products that require original packaging, such as figurine outer packaging, ensuring sharp corners. A must for box collectors.",
      addService4: "Vacuum Compression Bag",
      addServiceTip4: "Value-added service, CN￥15\nService description: Use a vacuum compression bag to centrally vacuum compress all items in the package. The maximum compression bag size is 80cm*60cm.\nService features: Significantly reduces volume, saving shipping costs for volumetric weight routes; also provides moisture, mold, dust, and insect prevention. Recommended for lightweight textile products like down jackets, bedding, and home textiles.",
      addService5: "Packaging Process Video",
      addServiceTip5: "Value-added service, CN￥8\nService description: Provides a full video of the packaging process, allowing you to visually see the entire packaging process and meet your needs to check the package status.\nThe packaging video can be viewed on the 'My Packages' page 30 minutes after completion; the video will be retained for 30 days.\nHow to purchase: After submitting the package and selecting the shipping route, choose the value-added service [Packaging Process Video].",
      addService6: "Moisture-proof Bag",
      addServiceTip6: "Value-added service, CN￥6\nService description: Add a moisture-proof bag to the outer surface of the carton package and seal it properly.\nService features: Thick PE material, effectively prevents the outer box from getting damp or the contents from molding due to weather factors during transit. Suitable for all product categories.",
      addService7: "Product Reinforcement - Bubble Column Packaging",
      addServiceTip: "Value-added service, CN￥15\n(1) Function: Uses bubble column material to wrap and protect products, significantly improving shock resistance and preventing damage from squeezing, collision, or dropping.\n(2) Suitable for: Cosmetics, electronics, figurines, glass jars, ceramic products.",
      addService8: "Product Reinforcement - Kraft Bubble Mailer Packaging",
      addServiceTip8: "Value-added service, CN￥10\n(1) Function: Uses kraft bubble mailers to package products, providing cushioning and shock absorption to prevent damage from squeezing, collision, or dropping.\n(2) Suitable for: Small jewelry, small jade items, small documents like driver's licenses/IDs, small electronics.",
      addService9: "Product Reinforcement - Pearl Cotton Packaging",
      addServiceTip9: "Value-added service, CN￥10\n(1) Function: Uses pearl cotton to wrap products in three layers, providing cushioning and shock absorption to prevent damage from squeezing, collision, or dropping.\n(2) Suitable for: Various fragile products with original packaging boxes.",
      addService10: "Product Reinforcement - Dust-proof Bag Packaging",
      addServiceTip10: "Value-added service, CN￥10\n(1) Function: Uses dust-proof bags to package products, providing dust, scratch, moisture, and sun discoloration protection.\n(2) Suitable for: Clothing, hats, shoes, and bags.",
      addService11: "Product Reinforcement - Inflatable Shoe Support",
      addServiceTip11: "Value-added service, CN￥1\nUsed to support the inside of shoes, protecting them from deformation.",
      addService12: "Product Reinforcement - Eco-friendly Wood Pulp Shoe Support",
      addServiceTip12: "Value-added service, CN￥10\nUsed to support the inside of shoes, protecting them from deformation.",
      remark: "Remarks",
      sendLine: "Shipping Route",
      noInsuranceTip: "Reminder: Transit orders do not qualify for free insurance. To purchase insurance, please contact customer service.",
      taxExemption: "Tax-Free",
      ShippingTime: "Shipping Time",
      select: "Select",
      changeLine: "Change Route",
      estTip15: "Billing Standard",
      taxPaymentMethod: "Tax Payment Method",
      recipientPays1: "Recipient Pays",
      recipientPays2: "Tax-Free",
      recipientPaysTip: "After the package arrives in the destination country, you may need to pay taxes. Please follow the customs or carrier's notice. If your package is taxed, please cooperate in paying the taxes to ensure smooth delivery.",
      declarationMethod: "Declaration Method",
      declarationMethod1: "System Declaration",
      declarationMethod2: "Self Declaration",
      declarationCurrency: "Declaration Currency",
      declarationMethod1Tip: "According to the latest customs requirements of your country, the platform recommends declaring the package value at %s of the total product value. System declaration is for reference only; you can fill in an appropriate declared value in the [Self Declaration] section.",
      declarationValue: "Total Declared Value of Package",
      estimatTaxesFee: "Estimated Taxes",
      disclaimerReminder: "Logistics Disclaimer",
      waybill_logistics_tips: "1. If the package is inspected by customs in the destination country, there may be a risk of taxation. If you receive a tax notice, please assist with customs clearance; otherwise, high return fees may apply.\n2. Package delivery is handled by third-party logistics providers. If a package is lost, Qcelf can assist users in coordinating compensation with the third-party logistics provider.",
      noLineData: "No matching logistics routes available",
      pre_package_weight: "Estimated Package Weight",
      package_weight: "Estimated Package Weight",
      package_weight3Tip: "This route will use the greater of the actual weight or volumetric weight as the package weight for shipping cost calculation.",
      estimateFreight: "Estimated Shipping Cost",
      addedServiceCharge: "Value-added Service Fee",
      carrierProcessingFee: "Carrier Processing Fee",
      fuelCharge: "Fuel Surcharge",
      operationFee: "Handling Fee",
      servicePrice: "Service Fee",
      memberDiscount: "Member Discount",
      memberDiscountAmountTip: "Member discounts are applied after coupon discounts, calculating the discount corresponding to your membership level.",
      exclusiveDiscount: "Exclusive Discount",
      exclusiveDiscountAmountTip: "Exclusive discounts are applied after coupon discounts, calculating the discount corresponding to your membership level.",
      estimatTaxesFee: "Estimated Taxes",
      estimatTaxesFeeAmountTip: "According to policy requirements, your country imposes tariffs + product taxes on imports from China. We estimate and collect the corresponding tax in advance, refunding any excess or requesting additional payment based on actual subsequent taxes.",
      submit_package: "Submit Package",
      global_cancel: "Cancel",
      gloabl_confirm: "Confirm",
      order_table_detail: "Product Details",
      order_table_price: "Unit Price",
      order_table_num: "Quantity",
      product_type: "Product Type",
      warehouse_createTime: "Storage Time",
      weight: "Weight (g)",
      size: "Dimensions (cm)",
      freight: "Shipping Cost",
      freight2: "Shipping Cost",
      tariff: "Tariff",
      firstWeightPrice: "First Weight Price",
      additionalWeightPrice: "Additional Weight Price",
      carrierProcessingFee: "Carrier Processing Fee",
      fuelCharge: "Fuel Surcharge",
      operationFee: "Handling Fee",
      servicePrice: "Service Fee",
      submitOrderTip1: "Please select a delivery address",
      packagingMethodTip: "Please select a packaging method!",
      lineSelectTip: "Please select a shipping route!",
      declarationValueTip: "Please fill in the total declared value of the package",
      sumbitSuccess: "Order submitted successfully",
      langProp: "Trans",
      warehouse_submit_tip: "If you have any other requirements for the package, please note here",
      service_charge: "Service Fee"
    },
    estimate: {
      PackageRestrictions: "Package Restrictions",
      estTip9: "Minimum weight limit:",
      estTip10: "Maximum weight limit:",
      estTip11: "Size limit:",
      estTip12: "Volumetric weight rule:",
      estTip13: "Not deliverable",
      estTip14: "Deliverable",
      estTip15: "Billing Standard",
      NotYetDelivered: "Not yet delivered",
      firstWeightPrice: "First Weight Price",
      additionalWeightPrice: "Additional Weight Price",
      carrierProcessingFee: "Carrier Processing Fee",
      fuelCharge: "Fuel Surcharge",
      operationFee: "Handling Fee",
      servicePrice: "Service Fee",
      ShippingCostEstimate: "Shipping Cost Estimate",
      estTip1: "Enter package dimensions (L x W x H) for more accurate calculation",
      WarehouseTo: "From Qcelf Warehouse to",
      selectCountry: "Select Country",
      weight: "Weight (g)",
      pleaseInputWeight: "Please enter weight",
      selectPlaceholder: "Please select",
      ProductTypes: "Product Types",
      long: "Length",
      width: "Width",
      height: "Height",
      Inquire: "Inquire",
      estTip2: "All non-Qcelf logistics services are provided by third-party carriers who may adjust shipping rates based on market conditions. Qcelf will notify you in advance of any price changes. To provide the best service experience, if you encounter issues with logistics services, Qcelf can assist in communicating with third-party carriers on your behalf.",
      taxExemption: "Tax-Free",
      TransportationCosts: "Transportation Costs",
      ShippingTime: "Shipping Time",
      dayText: "day(s)",
      lookDetail: "View Details",
      pack_up: "Collapse",
      UnavailableReason: "Unavailable Reason",
      estTip4: "Please enter the corresponding parameters to calculate shipping costs!",
      please_select_country: "Please select a country",
      pleaseInputWeight: "Please enter weight",
      countryHot: "Popular"
    },
    pay: {
        mine_cart_orderPay_nav: "Checkout",
        payMode: "Payment Method",
        Balance: "Balance",
        balanceOverTip: "Your balance is insufficient, please recharge before proceeding with payment",
        globalRecharge: "Top Up",
        Alipay: "Alipay",
        alipayTip: "",
        payAmount: "Total Price",
        property_recharge_money: "Recharge Amount",
        orderAmount: "Total amount due",
        handCharge: "Handling fee",
        cancelRecharge: "Cancel Recharge ",
        cancel_pay: "Cancel Payment",
        property_recharge_title: "Recharge",
        confirmPay: "Confirm Payment",
        common_please_select_channel: "Please choose a payment method"
        rechargeSuccess: "Recharge successful",
        paySuccess: "Payment Successful",
        paySuccessTip2:
            "Your package is being transported rapidly. Please wait patiently. You can track the status of your package using the logistics tracking number.",
        paySuccessTip: "Thank you for your business!",
        goback_assets: "Return My Wallet",
        viewOrder: "View Order",
        payFail: "Payment Failure",
    }
  }