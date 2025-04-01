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
     subMitYunOrder: "Submit Waybill",
     address: "Shipping Address",
     default: "Default",
     commodity_list: "Product List",
     orderNo: "Order Number",
     day: "days",
     warehouseSaveTip: "Your order will be stored in the Qcelf warehouse for 90 days for free.",
     packagingMethod: "Packaging method",
     packagingMethod1: "Carton packaging",
     packagingMethod2: "Plastic Bag Packaging",
     packagingMethodTip: "Please choose the packaging method!",
     paidServices: "Paid services",
     paidServicesTip:
         "Carton Packging does not require additional packaging fees, and is recommanded for shipping most of the items.",
     freeServicesTip:
         "Plastic Bag packaging does not require additional packaging fees, but may not be able to protect the items from being deformed.Please choose accordingly.",
     freeServices: "Free services",
     addedService: "Value-Added Services",
     addedServiceCharge: "Value-added Service Charge",
     addService1: "Stretch Film",
     addServiceTip1:
       "Value-Added Service，CN￥10/parcel\nCover the carton completely with stretch film.\nPack with stretch film to keep the parcel from getting wet and being switched. Suitable for all product categories.",
     addService2: "EPE loose Filling",
     addServiceTip2:
       "Value-Added Service，CN￥10\nFill up gaps inside of the carton with EPE fillings.\nFill up the parcel with EPE boards to protect against damage during transportation. It mostly applies to small-sized electronics and can be used together with paper corner protectors for better protection.",
     addService3: "Corner Protector",
     addServiceTip3:
       "Value-Added Service, CN￥20/parcel.\nPlace four corner protectors in the corner of the carton's out packaging.\nIt mostly applies when you need the original packaging for certain items (e.g. the outer packaging of action figures).",
     addService4: "Vacuum Packaging",
     addServiceTip4:
       "Value-Added Service, CN￥15/parcel\nProceed with vacuum compression for all items in one parcel.\nSave storage space by significantly compressing the volume, and help you save volume-based shipping fees. Also, it can protect items in the parcel against moisture, mold, dust, and insect. Preferred for items with lightweight and large volumes (down jackets, beddings, home textiles).",
     addService5: "Whole-Process Packing Video",
     addServiceTip5:
       'Value-Added Service, CN￥8/parcel\nProvide videos of the packaging process \nPackaging video can be viewed after the parcel status is "Shipped".',
     addService6: "Moister-Barrier Bag",
     addServiceTip6:
       "Value-Added Service，CN￥6/Parcel\nPack the carton with a moisture-proof bag and seal it tightly.\nProtect the parcel's outer packaging against getting wet during transport, so as to keep the items inside mould-free. Suitable for all product categories. ",
     addService7: "Bubble Cushioning Wrap Packaging",
     addServiceTip7:
       "Value-Added Service，CN¥15/Parcel\n（1） Function： Pack products with bubble cushioning wrap (with the enhanced anti-shock feature) to protect them against damage due to crushing, collision, and falling off.\n（2） Applicable Category： Suitable for cosmetics, electronics, action figures, glass bottles, and ceramics.",
     addService8: "Bubble Mailer Packaging",
     addServiceTip8:
       "Value-Added Service，CN¥10/Parcel\n（1） Function： Pack products with bubble mailers (with cushioning and anti-shock features) to protect them against damage due to crushing, collision, and falling off.\n（2） Applicable Category： Suitable for small-sized jewelry/jade products, driver's licenses / ID cards, as well as small-sized electronics.",
     addService9: "EPE Packaging",
     addServiceTip9:
       "Value-Added Service，CN¥10/Parcel\n（1） Function： Pack products in 3 layers of EPE (with cushioning and anti-shock features) to protect them against damage due to crushing, collision, and falling off.\n（2） Applicable Category： Suitable for fragile products with packing boxes.",
     addService10: "Dust-proof Bag Packaging",
     addServiceTip10:
       "Value-Added Service，CN¥10/Parcel\n（1） Function： Pack products with dust-proof bags to protect them against dust, scratch, moisture, and discoloration (due to long-time exposure to sunlight).\n（2） Applicable Category： Suitable for clothing, hats, shoes, and bags.",
     addService11: "Inflatable shoe trees",
     addServiceTip11:
       "Value-Added Service，CN¥1/Parcel\nUsed to support the inside of shoes and protect them from deformation",
     addService12: "Environmentally friendly wood pulp shoe trees",
     addServiceTip12:
       "Value-Added Service，CN¥10/Parcel\nUsed to support the inside of shoes and protect them from deformation",
     remark: "Note",
     sendLine: "Shipping Line",
     noInsuranceTip:
         "Tip: Forwarding orders cannot enjoy free insurance, please consult customer service for additional insurance.",
     taxExemption: "Tax Free",
     ShippingTime: "Estimated Shipping Time",
     select: "Select",
     changeLine: "Cancel",
     estTip15: "Billing Standard",
     taxPaymentMethod: "Tax payment method",
     recipientPays1: "Recipient pays",
     recipientPays2: "Tax Free",
     recipientPaysTip:
         "After the package arrives in the destination country, you may need to pay taxes. Please refer to the customs or carrier's notification for accuracy. If your package is subject to taxes, please cooperate in paying the taxes so that the package can be delivered to you smoothly.",
     declarationMethod: "Declaration method",
     declarationMethod1: "Systematic Declaration",
     declarationMethod2: "Self Declaration",
     declarationCurrency: "Declaration Currency",
     declarationMethod1Tip:
         "According to the latest customs requirements of your country, we recommends that the declared amount of the parcel be %s of the total value. The system declaration is for reference only. You can fill in the declared value you think is appropriate in the [Self-Declaration] section.",
     declarationValue: "Total declared value of package",
     estimatTaxesFee: "Pre-paid Tax",
     disclaimerReminder: "Logistics disclaimer reminder",
     waybill_logistics_tips: "1. When the package is cleared by the customs of the destination country, there may be a risk of being taxed if it is inspected. If you receive a tax notice, please actively assist in customs clearance, otherwise there may be high return fees.\n2. Packages are delivered by third-party logistics carriers. If the package is lost, Qcelf can coordinate compensation matters with the third-party logistics carrier on behalf of the user.",
     noLineData: "There is currently no matching logistics trunk line",
     pre_package_weight: "Estimated weight of parcel",
     package_weight: "Estimated Actual Weight of Parcel",
     package_weight3: "Estimated Volume Weight of Parcel ",
     package_weight3Tip:
         "This Line will use the larger of the actual weight and volumetric weight of the parcel to calculate the shipping fee.",
     estimateFreight: "Estimated Shipping Cost",
     addedServiceCharge: "Value-added Service Charge",
     carrierProcessingFee: "Carrier Processing Fee",
     fuelCharge: "Fuel Charge",
     operationFee: "Operation Fee",
     servicePrice: "Service Fee",
     memberDiscount: "Member Discount",
     memberDiscountAmountTip:
         "Member discounts calculation is based on the amount discounted by coupon;The discount rate is according to your membership level.",
     exclusiveDiscount: "Exclusive Discount",
     exclusiveDiscountAmountTip:
         "Exclusive discounts calculation is based on the amount discounted by coupon;The discount rate is according to your membership level.",
     estimatTaxesFee: "Pre-paid Tax",
     estimatTaxesFeeAmountTip:
         "According to policy requirements, your country charges customs duties + commodity taxes on Chinese imported goods. We charge the corresponding taxes in advance based on estimates, and will refund any excess or make up for the remainder based on the actual subsequent tax fee.",
     submit_package: "Submit Parcel",
     global_cancel: "Cancel",
     gloabl_confirm: "Confirm",
     order_table_detail: "Product Details",
     order_table_price: "Unit Price",
     order_table_num: "Quantity",
     product_type: "Product Type",
     warehouse_createTime: "Storage Time",
     weight: "Weight (g)",
     size: "Size (cm)",
     freight: "Shipping Fee",
     freight2: " China Domestic Warehouse",
     tariff: "Customs Duty",
     firstWeightPrice: "First weight price",
     additionalWeightPrice: "Continued weight price",
     carrierProcessingFee: "Carrier Processing Fee",
     fuelCharge: "Fuel Charge",
     operationFee: "Operation Fee",
     servicePrice: "Service Fee",
     submitOrderTip1: "Please select the shipping address",
     packagingMethodTip: "Please choose the packaging method!",
     lineSelectTip: "Please select a shipping route!",
     declarationValueTip: "The declared total value of the package must be required",
     sumbitSuccess: "Order submitted successfully",
     langProp: "Trans",
     warehouse_submit_tip: "If you have any other requirements for the package, please note here",
     service_charge: "Service Fee",
    },
    estimate: {
       PackageRestrictions: "Parcel Restrictions",
       estTip9: "Minimum Weight:",
       estTip10: "Maximum Weight:",
       estTip11: "Size Restrictions:",
       estTip12: "Volumetric Billing Rules:",
       estTip13: "Not shippable",
       estTip14: "Can be shipped",
       estTip15: "Billing Standard",
       NotYetDelivered: "Not yet delivered",
       firstWeightPrice: "First weight price",
       additionalWeightPrice: "Continued weight price",
       carrierProcessingFee: "Carrier Processing Fee",
       fuelCharge: "Fuel Charge",
       operationFee: "Operation Fee",
       servicePrice: "Service Fee",
       ShippingCostEstimate: "Estimation",
       estTip1: "Enter the package dimensions (length, width, height) for more accurate calculations",
       WarehouseTo: "Qcelf Warehouse To",
       selectCountry: "Select country",
       weight: "Weight (g)",
       pleaseInputWeight: "Please enter weight",
       selectPlaceholder: "Please select",
       ProductTypes: "Product Types",
       long: "Length",
       width: "Width",
       height: "Height",
       Inquire: "Inquire",
       estTip2:
           "All logistics services for non Qcelf proprietary lines are provided by third-party logistics providers, who will adjust the freight price according to the market conditions. Qcelf will notify if there is any price change. To provide the ultimate service experience, Qcelf can negotiate with third-party logistics providers on your behalf if you encounter problems in logistics services.",
       taxExemption: "Tax Free",
       TransportationCosts: "Shipping Fee",
       ShippingTime: "Estimated Shipping Time",
       dayText: "days",
       lookDetail: "View Details",
       pack_up: "See less",
       UnavailableReason: "Unavailable Reason",
       estTip4: "Please enter the corresponding parameters to check the freight!",
       please_select_country: "Please select a country",
       pleaseInputWeight: "Please enter weight",
       countryHot: "Popular",
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