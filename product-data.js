/* Manufacturer-sourced model cases. Maintain research/*.json and run node compile-products.cjs. */
window.CL_PRODUCTS = Object.freeze([
  {
    "id": "dell-poweredge-r350",
    "name": "Dell PowerEdge R350",
    "brand": "Dell",
    "model": "PowerEdge R350",
    "category": "server",
    "subtype": "rack-1u",
    "categoryLabel": "Servers · 1U rack",
    "price": null,
    "image": "assets/products/web/server-dell-poweredge-r350.webp",
    "imageAlt": "Dell PowerEdge R350",
    "imageSource": "https://i.dell.com/sites/csdocuments/Product_Docs/en/Dell-EMC-PowerEdge-R350-Spec-sheet.pdf",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://i.dell.com/sites/csdocuments/Product_Docs/en/Dell-EMC-PowerEdge-R350-Spec-sheet.pdf",
    "sourceTitle": "Dell PowerEdge R350 Spec Sheet",
    "verifiedAt": "2026-10-16",
    "badge": "1U single socket",
    "description": "Single-socket 1U server with ECC DDR4 memory and optional hot-swap storage for branch offices and everyday business applications.",
    "scenario": "Branch offices, file sharing, and core business applications.",
    "specs": [
      [
        "Form factor",
        "1U rack / single socket"
      ],
      [
        "Processors",
        "Intel Xeon E-2300, up to 8 cores; Pentium options also available"
      ],
      [
        "Memory",
        "4 DDR4 ECC UDIMM slots, up to 128 GB"
      ],
      [
        "Front drive bays",
        "Options for up to 4 × 3.5-inch or 8 × 2.5-inch SAS/SATA drives"
      ],
      [
        "Networking",
        "Onboard 2 × 1GbE"
      ],
      [
        "Management",
        "iDRAC9 / OpenManage"
      ]
    ],
    "tags": [
      "Dell",
      "1U",
      "Single socket",
      "DDR4",
      "Branch office"
    ],
    "colors": [],
    "newRank": 41,
    "provenanceNote": "Dell R350 specification sheet, page 1; original image width: 926 px. Bezel and internal components vary by configuration.",
    "originalImage": "assets/products/server-dell-poweredge-r350.png"
  },
  {
    "id": "h3c-s5130s-28p-ei",
    "name": "H3C S5130S-28P-EI",
    "brand": "H3C",
    "model": "S5130S-28P-EI",
    "category": "switch",
    "subtype": "access",
    "categoryLabel": "Switches · Enterprise access",
    "price": null,
    "image": "assets/products/web/switch-h3c-s5130s-28p-ei.webp",
    "imageAlt": "H3C S5130S-28P-EI switch",
    "imageSource": "https://resource.h3c.com/cn/202106/25/20210625_5849614_%E6%9C%AA%E6%A0%87%E9%A2%98-4_1418714_30003_0.jpg",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://www.h3c.com/cn/Products_And_Solution/InterConnect/Products/Switches/Products/Park_Switches/Access_Switch/S5130/H3C_S5130S-EI/",
    "sourceTitle": "H3C S5130S-EI Next-Generation High-Performance Gigabit Ethernet Switches",
    "verifiedAt": "2026-10-16",
    "badge": "24-port Gigabit access",
    "description": "24-port Gigabit access switch with four Gigabit SFP uplinks for office endpoints and campus networks.",
    "scenario": "Office and campus access with Gigabit fiber uplinks. Check transceiver compatibility and management requirements.",
    "specs": [
      [
        "Copper ports",
        "24 × 10/100/1000BASE-T"
      ],
      [
        "Optical ports",
        "4 × 1000BASE-X SFP"
      ],
      [
        "Dimensions (W × D × H)",
        "440 × 160 × 43.6 mm"
      ],
      [
        "Maximum power",
        "23 W"
      ],
      [
        "Weight",
        "≤ 2.5 kg"
      ]
    ],
    "tags": [
      "Gigabit",
      "24 ports",
      "SFP",
      "Campus",
      "Office"
    ],
    "featured": true,
    "colors": [],
    "newRank": 40,
    "provenanceNote": "Official H3C product image for S5130S-28P-EI. Copyright belongs to H3C.",
    "originalImage": "assets/products/switch-h3c-s5130s-28p-ei.jpg"
  },
  {
    "id": "seagate-exos-x18-18tb",
    "name": "Seagate Exos X18 18 TB",
    "brand": "Seagate",
    "model": "ST18000NM000J",
    "category": "storage",
    "subtype": "hdd",
    "categoryLabel": "Server drives · Enterprise HDD",
    "image": "assets/products/web/storage-seagate-exos-x18.webp",
    "imageScope": "series",
    "imageSource": "https://www.seagate.com/files/www-content/datasheets/pdfs/exos-x18-channel-DS2045-4-2106US-en_US.pdf#page=1",
    "imageNote": "Manufacturer series image. Capacity and interface may vary; refer to the listed part number.",
    "sourceUrl": "https://www.seagate.com/files/www-content/datasheets/pdfs/exos-x18-channel-DS2045-4-2106US-en_US.pdf",
    "sourceTitle": "Seagate Exos X18 Data Sheet DS2045-4",
    "badge": "18 TB · SATA",
    "description": "18 TB helium-filled enterprise SATA HDD with CMR recording and a 256 MB cache for bulk storage.",
    "scenario": "Bulk server storage and backups. Check chassis, backplane, and RAID controller support for capacity and sector format.",
    "specs": [
      [
        "Capacity",
        "18 TB"
      ],
      [
        "Interface",
        "SATA 6 Gb/s"
      ],
      [
        "Spindle speed",
        "7200 RPM"
      ],
      [
        "Recording technology",
        "CMR"
      ],
      [
        "Cache",
        "256 MB"
      ],
      [
        "Sector format",
        "512e / 4Kn FastFormat"
      ],
      [
        "Sustained transfer rate",
        "Up to 270 MB/s"
      ]
    ],
    "tags": [
      "18 TB",
      "Enterprise HDD",
      "SATA",
      "CMR",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Seagate Exos X18 18 TB — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 39,
    "provenanceNote": "Seagate Exos X18 data sheet: 18 TB series image. Interface and encryption variants may look alike; this listing specifies ST18000NM000J.",
    "originalImage": "assets/products/storage-seagate-exos-x18.png"
  },
  {
    "id": "intel-x710-da2",
    "name": "Intel X710-DA2 Dual-Port 10GbE Adapter",
    "brand": "Intel",
    "model": "X710-DA2",
    "category": "accessory",
    "subtype": "nic",
    "categoryLabel": "Components · Network adapters",
    "image": "assets/products/web/accessory-intel-x710-da2.webp",
    "imageScope": "model",
    "imageSource": "https://cdrdv2-public.intel.com/641693/Intel%20Ethernet%20Network%20Adapter%20X710.pdf#page=1",
    "imageNote": "Manufacturer image of this network adapter.",
    "sourceUrl": "https://www.intel.com/content/www/us/en/products/sku/83964/intel-ethernet-converged-network-adapter-x710da2/specifications.html",
    "sourceTitle": "Intel Ethernet Converged Network Adapter X710-DA2 Specifications",
    "badge": "Dual port · 10GbE",
    "description": "Dual-port SFP+ adapter with the Intel X710 controller, PCIe 3.0 x8, and 1/10GbE connectivity for server networking.",
    "scenario": "10GbE server upgrades. Verify SFP+ transceiver or DAC compatibility, driver support, and PCIe lane availability.",
    "specs": [
      [
        "Ports",
        "2 × SFP+"
      ],
      [
        "Port speeds",
        "10 / 1GbE"
      ],
      [
        "Host interface",
        "PCIe 3.0 x8"
      ],
      [
        "Controller",
        "Intel X710"
      ],
      [
        "Virtualization",
        "SR-IOV / VMDq supported"
      ],
      [
        "Bracket",
        "Low-profile and full-height"
      ],
      [
        "Storage protocols",
        "iSCSI / NFS"
      ]
    ],
    "tags": [
      "Network adapter",
      "10GbE",
      "SFP+",
      "PCIe 3.0",
      "Dual port",
      "SR-IOV"
    ],
    "price": null,
    "imageAlt": "Intel X710-DA2 Dual-Port 10GbE Adapter",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 38,
    "provenanceNote": "Dual-port adapter image from the Intel X710 product brief. Brackets and board revisions may vary.",
    "originalImage": "assets/products/accessory-intel-x710-da2.png"
  },
  {
    "id": "dell-poweredge-r450",
    "name": "Dell PowerEdge R450",
    "brand": "Dell",
    "model": "PowerEdge R450",
    "category": "server",
    "subtype": "rack-1u",
    "categoryLabel": "Servers · 1U rack",
    "price": null,
    "image": "assets/products/web/server-dell-poweredge-r450.webp",
    "imageAlt": "Dell PowerEdge R450",
    "imageSource": "https://i.dell.com/sites/csdocuments/Product_Docs/en/R450-spec-sheet.pdf",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://i.dell.com/sites/csdocuments/Product_Docs/en/R450-spec-sheet.pdf",
    "sourceTitle": "Dell PowerEdge R450 Spec Sheet",
    "verifiedAt": "2026-10-16",
    "badge": "1U dual socket",
    "description": "Dual-socket 1U server with DDR4 memory, PCIe Gen4 expansion, and SAS/SATA storage options for infrastructure services and light virtualization.",
    "scenario": "Small and midsize IT environments, infrastructure services, and light virtualization.",
    "specs": [
      [
        "Form factor",
        "1U rack / dual socket"
      ],
      [
        "Processors",
        "Up to 2 × 3rd Gen Intel Xeon Scalable processors, up to 24 cores each"
      ],
      [
        "Memory",
        "16 DDR4 RDIMM slots, up to 1 TB / 2933 MT/s"
      ],
      [
        "Front drive bays",
        "Options for up to 4 × 3.5-inch or 8 × 2.5-inch SAS/SATA drives"
      ],
      [
        "Expansion",
        "2 PCIe Gen4 slots; OCP 3.0 networking options"
      ],
      [
        "Management",
        "iDRAC9 / OpenManage"
      ]
    ],
    "tags": [
      "Dell",
      "1U",
      "Dual socket",
      "DDR4",
      "Virtualization"
    ],
    "colors": [],
    "newRank": 37,
    "provenanceNote": "Dell R450 specification sheet, page 1; original image: 283 × 133 px. Exact model image with limited detail; not upscaled.",
    "originalImage": "assets/products/server-dell-poweredge-r450.png"
  },
  {
    "id": "h3c-s5130s-52s-ei",
    "name": "H3C S5130S-52S-EI",
    "brand": "H3C",
    "model": "S5130S-52S-EI",
    "category": "switch",
    "subtype": "access",
    "categoryLabel": "Switches · Enterprise access",
    "price": null,
    "image": "assets/products/web/switch-h3c-s5130s-52s-ei.webp",
    "imageAlt": "H3C S5130S-52S-EI switch",
    "imageSource": "https://resource.h3c.com/cn/202106/25/20210625_5849611_%E6%9C%AA%E6%A0%87%E9%A2%98-7_1418711_30003_0.jpg",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://www.h3c.com/cn/Products_And_Solution/InterConnect/Products/Switches/Products/Park_Switches/Access_Switch/S5130/H3C_S5130S-EI/",
    "sourceTitle": "H3C S5130S-EI Next-Generation High-Performance Gigabit Ethernet Switches",
    "verifiedAt": "2026-10-16",
    "badge": "48-port Gigabit access",
    "description": "48-port Gigabit access switch with four 10G SFP+ uplinks for high-density office and campus access.",
    "scenario": "Dense office and campus access with 10G connections to upstream switches.",
    "specs": [
      [
        "Copper ports",
        "48 × 10/100/1000BASE-T"
      ],
      [
        "Uplink ports",
        "4 × 1/10GE SFP+"
      ],
      [
        "Dimensions (W × D × H)",
        "440 × 230 × 43.6 mm"
      ],
      [
        "Maximum power",
        "44 W"
      ],
      [
        "Weight",
        "≤ 3.5 kg"
      ]
    ],
    "tags": [
      "Gigabit",
      "48 ports",
      "10G uplinks",
      "SFP+",
      "Campus"
    ],
    "featured": false,
    "colors": [],
    "newRank": 36,
    "provenanceNote": "Official H3C product image for S5130S-52S-EI. Copyright belongs to H3C.",
    "originalImage": "assets/products/switch-h3c-s5130s-52s-ei.jpg"
  },
  {
    "id": "seagate-exos-x20-20tb",
    "name": "Seagate Exos X20 20 TB",
    "brand": "Seagate",
    "model": "ST20000NM007D",
    "category": "storage",
    "subtype": "hdd",
    "categoryLabel": "Server drives · Enterprise HDD",
    "image": "assets/products/web/storage-seagate-exos-x20.webp",
    "imageScope": "series",
    "imageSource": "https://www.seagate.com/files/www-content/datasheets/pdfs/exos-x20-channel-DS2080-2111GB-en_EM.pdf#page=1",
    "imageNote": "Manufacturer series image. Capacity and interface may vary; refer to the listed part number.",
    "sourceUrl": "https://www.seagate.com/files/www-content/datasheets/pdfs/exos-x20-channel-DS2080-2111GB-en_EM.pdf",
    "sourceTitle": "Seagate Exos X20 Data Sheet DS2080",
    "badge": "20 TB · SATA",
    "description": "20 TB helium-filled enterprise SATA HDD with CMR recording and 7200 RPM operation for capacity-focused storage.",
    "scenario": "Data lakes, backup archives, and storage expansion. Check backplane power, cooling, and controller compatibility.",
    "specs": [
      [
        "Capacity",
        "20 TB"
      ],
      [
        "Interface",
        "SATA 6 Gb/s"
      ],
      [
        "Spindle speed",
        "7200 RPM"
      ],
      [
        "Recording technology",
        "CMR"
      ],
      [
        "Cache",
        "256 MB"
      ],
      [
        "Sector format",
        "512e / 4Kn FastFormat"
      ],
      [
        "Sustained transfer rate",
        "Up to 285 MB/s"
      ]
    ],
    "tags": [
      "20 TB",
      "Enterprise HDD",
      "SATA",
      "CMR",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Seagate Exos X20 20 TB — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 35,
    "provenanceNote": "Seagate Exos X20 data sheet: 20 TB series image. Interface and firmware details must match ST20000NM007D.",
    "originalImage": "assets/products/storage-seagate-exos-x20.png"
  },
  {
    "id": "intel-x550-t2",
    "name": "Intel X550-T2 Dual-Port 10GBASE-T Adapter",
    "brand": "Intel",
    "model": "X550-T2",
    "category": "accessory",
    "subtype": "nic",
    "categoryLabel": "Components · Network adapters",
    "image": "assets/products/web/accessory-intel-x550-t2.webp",
    "imageScope": "model",
    "imageSource": "https://cdrdv2-public.intel.com/710174/Intel%20Ethernet%20Converged%20Network%20Adapter%20X550%20Product%20Brief.pdf#page=1",
    "imageNote": "Manufacturer image of this network adapter.",
    "sourceUrl": "https://www.intel.com/content/www/us/en/products/sku/88209/intel-ethernet-converged-network-adapter-x550t2/specifications.html",
    "sourceTitle": "Intel Ethernet Converged Network Adapter X550-T2 Specifications",
    "badge": "Dual port · 10GBASE-T",
    "description": "Dual-port RJ45 adapter with PCIe 3.0 x4 and multi-rate Ethernet support up to 10GbE for copper-based server networks.",
    "scenario": "Server upgrades on copper networks. Check Intel driver documentation for 2.5GbE and 5GbE operating system support.",
    "specs": [
      [
        "Ports",
        "2 × RJ45"
      ],
      [
        "Port speeds",
        "10G / 5G / 2.5G / 1G / 100M"
      ],
      [
        "Host interface",
        "PCIe 3.0 x4"
      ],
      [
        "Controller",
        "Intel X550"
      ],
      [
        "Cabling",
        "Cat6 up to 55 m / Cat6A up to 100 m"
      ],
      [
        "Virtualization",
        "SR-IOV / VMDq supported"
      ],
      [
        "NBASE-T support",
        "Linux only, per Intel documentation"
      ]
    ],
    "tags": [
      "Network adapter",
      "10GbE",
      "RJ45",
      "Copper Ethernet",
      "PCIe 3.0",
      "Dual port"
    ],
    "price": null,
    "imageAlt": "Intel X550-T2 Dual-Port 10GBASE-T Adapter",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 34,
    "provenanceNote": "Dual-port RJ45 adapter image from the Intel X550 product brief.",
    "originalImage": "assets/products/accessory-intel-x550-t2.png"
  },
  {
    "id": "dell-poweredge-r550",
    "name": "Dell PowerEdge R550",
    "brand": "Dell",
    "model": "PowerEdge R550",
    "category": "server",
    "subtype": "rack-2u",
    "categoryLabel": "Servers · 2U rack",
    "price": null,
    "image": "assets/products/web/server-dell-poweredge-r550.webp",
    "imageAlt": "Dell PowerEdge R550",
    "imageSource": "https://i.dell.com/sites/csdocuments/Product_Docs/en/R550-spec-sheet.pdf",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://i.dell.com/sites/csdocuments/Product_Docs/en/R550-spec-sheet.pdf",
    "sourceTitle": "Dell PowerEdge R550 Spec Sheet",
    "verifiedAt": "2026-10-16",
    "badge": "2U dual socket",
    "description": "Dual-socket 2U server with DDR4 memory and multiple SAS/SATA drive configurations for business applications and local storage.",
    "scenario": "Business applications, file services, and light virtualization.",
    "specs": [
      [
        "Form factor",
        "2U rack / dual socket"
      ],
      [
        "Processors",
        "Up to 2 × 3rd Gen Intel Xeon Scalable processors, up to 24 cores each"
      ],
      [
        "Memory",
        "16 DDR4 RDIMM slots, up to 1 TB / 2933 MT/s"
      ],
      [
        "Front drive bays",
        "Options for up to 16 × 2.5-inch or 8 × 3.5-inch SAS/SATA drives"
      ],
      [
        "Expansion",
        "3 PCIe Gen4 slots + 1 PCIe Gen3 slot"
      ],
      [
        "Management",
        "iDRAC9 / OpenManage"
      ]
    ],
    "tags": [
      "Dell",
      "2U",
      "Dual socket",
      "DDR4",
      "SAS/SATA"
    ],
    "colors": [],
    "newRank": 33,
    "provenanceNote": "Dell R550 specification sheet, page 1; original image width: 725 px. The drive bays and installed drives show one configuration.",
    "originalImage": "assets/products/server-dell-poweredge-r550.png"
  },
  {
    "id": "h3c-s5560x-30c-ei",
    "name": "H3C S5560X-30C-EI",
    "brand": "H3C",
    "model": "S5560X-30C-EI",
    "category": "switch",
    "subtype": "aggregation",
    "categoryLabel": "Switches · Aggregation",
    "price": null,
    "image": "assets/products/web/switch-h3c-s5560x-30c-ei.webp",
    "imageAlt": "H3C S5560X-30C-EI switch",
    "imageSource": "https://resource.h3c.com/en/202008/06/20200806_5114672_1_1317652_294549_0.jpg",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://www.h3c.com/en/Products_and_Solutions/InterConnect/Switches/Products/Campus_Network/Aggregation/S5500/H3C_S5560X-EI/",
    "sourceTitle": "H3C S5560X-EI Series Converged Gigabit Switches",
    "verifiedAt": "2026-10-16",
    "badge": "Modular aggregation",
    "description": "24-port Gigabit switch with four 10G SFP+ ports and an expansion slot for campus access or aggregation.",
    "scenario": "Campus access and small aggregation networks. Specify expansion cards, power supplies, and fan modules for the deployment.",
    "specs": [
      [
        "Copper ports",
        "24 × Gigabit (including 8 combo pairs)"
      ],
      [
        "Fixed SFP+ ports",
        "4 × 10G SFP+"
      ],
      [
        "Expansion slots",
        "1"
      ],
      [
        "Power supply slots",
        "2"
      ],
      [
        "Port switching capacity",
        "288 Gb/s"
      ],
      [
        "Forwarding rate",
        "216 Mpps"
      ],
      [
        "Dimensions (W × D × H)",
        "440 × 360 × 43.6 mm"
      ]
    ],
    "tags": [
      "Gigabit",
      "24 ports",
      "10G",
      "Modular",
      "Comware",
      "Aggregation"
    ],
    "featured": true,
    "colors": [],
    "newRank": 32,
    "provenanceNote": "Official H3C product image for S5560X-30C-EI. Copyright belongs to H3C.",
    "originalImage": "assets/products/switch-h3c-s5560x-30c-ei.jpg"
  },
  {
    "id": "seagate-exos-x24-24tb",
    "name": "Seagate Exos X24 24 TB",
    "brand": "Seagate",
    "model": "ST24000NM002H",
    "category": "storage",
    "subtype": "hdd",
    "categoryLabel": "Server drives · Enterprise HDD",
    "image": "assets/products/web/storage-seagate-exos-x24.webp",
    "imageScope": "series",
    "imageSource": "https://www.seagate.com/content/dam/seagate/en/content-fragments/products/datasheets/exos-x24/exos-x24-DS2080-2307US-en_US.pdf#page=1",
    "imageNote": "Manufacturer series image. Capacity and interface may vary; refer to the listed part number.",
    "sourceUrl": "https://www.seagate.com/content/dam/seagate/en/content-fragments/products/datasheets/exos-x24/exos-x24-DS2080-2307US-en_US.pdf",
    "sourceTitle": "Seagate Exos X24 Data Sheet DS2080-2307US",
    "badge": "24 TB · SATA",
    "description": "24 TB helium-filled enterprise SATA HDD with CMR recording and a 512 MB cache for high-density storage.",
    "scenario": "Capacity-focused storage nodes and backup systems. Verify the full part number against the array controller support list.",
    "specs": [
      [
        "Capacity",
        "24 TB"
      ],
      [
        "Interface",
        "SATA 6 Gb/s"
      ],
      [
        "Spindle speed",
        "7200 RPM"
      ],
      [
        "Recording technology",
        "CMR"
      ],
      [
        "Cache",
        "512 MB"
      ],
      [
        "Sector format",
        "512e / 4Kn"
      ],
      [
        "Sustained transfer rate",
        "Up to 285 MB/s"
      ]
    ],
    "tags": [
      "24 TB",
      "Enterprise HDD",
      "SATA",
      "CMR",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Seagate Exos X24 24 TB — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 31,
    "provenanceNote": "Seagate Exos X24 series image. The image does not identify an individual SKU; specifications apply to ST24000NM002H, 24 TB SATA.",
    "originalImage": "assets/products/storage-seagate-exos-x24.png"
  },
  {
    "id": "nvidia-connectx5-mcx512a-acat",
    "name": "NVIDIA ConnectX-5 Dual-Port 25GbE Adapter",
    "brand": "NVIDIA Mellanox",
    "model": "MCX512A-ACAT",
    "category": "accessory",
    "subtype": "nic",
    "categoryLabel": "Components · Network adapters",
    "image": "assets/products/web/accessory-nvidia-connectx5.webp",
    "imageScope": "series",
    "imageSource": "https://network.nvidia.com/sites/default/files/doc-2020/pb-connectx-5-en-card.pdf#page=1",
    "imageNote": "Manufacturer series image. Ports and brackets vary by model.",
    "sourceUrl": "https://networking-docs.nvidia.com/connectx5enhw/specifications",
    "sourceTitle": "NVIDIA ConnectX-5 MCX512A-ACAT / ACUT Specifications",
    "badge": "Dual port · 25GbE",
    "description": "Dual-port SFP28 adapter with 1/10/25GbE connectivity and a PCIe 3.0 x8 host interface for data center servers.",
    "scenario": "25GbE server interconnects. Match switch ports, transceivers or DACs, firmware, and drivers.",
    "specs": [
      [
        "Ports",
        "2 × SFP28"
      ],
      [
        "Port speeds",
        "1 / 10 / 25GbE"
      ],
      [
        "Host interface",
        "PCIe 3.0 x8"
      ],
      [
        "Board dimensions",
        "68.90 × 142.24 mm"
      ],
      [
        "Supply voltage",
        "12 V"
      ],
      [
        "Typical power",
        "9.5 W (passive cables)"
      ],
      [
        "Operating temperature",
        "0 to 55 °C"
      ]
    ],
    "tags": [
      "Network adapter",
      "25GbE",
      "SFP28",
      "ConnectX-5",
      "Dual port",
      "PCIe 3.0"
    ],
    "price": null,
    "imageAlt": "NVIDIA ConnectX-5 Dual-Port 25GbE Adapter — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 30,
    "provenanceNote": "NVIDIA/Mellanox ConnectX-5 EN series image from the product brief listing MCX512A-ACAT. Ports, brackets, and board revisions vary by model.",
    "originalImage": "assets/products/accessory-nvidia-connectx5.png"
  },
  {
    "id": "dell-poweredge-r650",
    "name": "Dell PowerEdge R650",
    "brand": "Dell",
    "model": "PowerEdge R650",
    "category": "server",
    "subtype": "rack-1u",
    "categoryLabel": "Servers · 1U rack",
    "price": null,
    "image": "assets/products/web/server-dell-poweredge-r650.webp",
    "imageAlt": "Dell PowerEdge R650",
    "imageSource": "https://i.dell.com/sites/csdocuments/Product_Docs/en/poweredge-r650-spec-sheet.pdf",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://i.dell.com/sites/csdocuments/Product_Docs/en/poweredge-r650-spec-sheet.pdf",
    "sourceTitle": "Dell PowerEdge R650 Spec Sheet",
    "verifiedAt": "2026-10-16",
    "badge": "High-density 1U",
    "description": "Dual-socket 1U server with 32 DDR4 DIMM slots and SAS, SATA, or NVMe storage for dense compute environments.",
    "scenario": "High-density virtualization, databases, and standardized data center deployments.",
    "specs": [
      [
        "Form factor",
        "1U rack / dual socket"
      ],
      [
        "Processors",
        "Up to 2 × 3rd Gen Intel Xeon Scalable processors, up to 40 cores each"
      ],
      [
        "Memory",
        "32 DDR4 DIMM slots, up to 3200 MT/s"
      ],
      [
        "Front drive bays",
        "Options for up to 10 × 2.5-inch SAS/SATA/NVMe drives; 3.5-inch chassis also available"
      ],
      [
        "Rear drive bays",
        "Options for up to 2 × 2.5-inch SAS/SATA/NVMe drives"
      ],
      [
        "Expansion",
        "PCIe Gen4; optional OCP 3.0 network adapter"
      ],
      [
        "Management",
        "iDRAC9 / OpenManage"
      ]
    ],
    "tags": [
      "Dell",
      "1U",
      "Dual socket",
      "DDR4",
      "NVMe",
      "Database"
    ],
    "colors": [],
    "newRank": 29,
    "provenanceNote": "Dell R650 specification sheet, page 1; original image width: 843 px. Shown with the front bezel installed.",
    "originalImage": "assets/products/server-dell-poweredge-r650.png"
  },
  {
    "id": "h3c-s5560x-54c-ei",
    "name": "H3C S5560X-54C-EI",
    "brand": "H3C",
    "model": "S5560X-54C-EI",
    "category": "switch",
    "subtype": "aggregation",
    "categoryLabel": "Switches · Aggregation",
    "price": null,
    "image": "assets/products/web/switch-h3c-s5560x-54c-ei.webp",
    "imageAlt": "H3C S5560X-54C-EI switch",
    "imageSource": "https://resource.h3c.com/en/202008/06/20200806_5114671_2_1317651_294549_0.jpg",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://www.h3c.com/en/Products_and_Solutions/InterConnect/Switches/Products/Campus_Network/Aggregation/S5500/H3C_S5560X-EI/",
    "sourceTitle": "H3C S5560X-EI Series Converged Gigabit Switches",
    "verifiedAt": "2026-10-16",
    "badge": "48-port expandable aggregation",
    "description": "48-port Gigabit switch with four 10G SFP+ ports, an expansion slot, and two power supply slots.",
    "scenario": "High-density campus access and aggregation. Confirm the required power supplies and expansion modules.",
    "specs": [
      [
        "Copper ports",
        "48 × 10/100/1000BASE-T"
      ],
      [
        "Fixed SFP+ ports",
        "4 × 10G SFP+"
      ],
      [
        "Expansion slots",
        "1"
      ],
      [
        "Power supply slots",
        "2"
      ],
      [
        "Port switching capacity",
        "336 Gb/s"
      ],
      [
        "Forwarding rate",
        "252 Mpps"
      ],
      [
        "Dimensions (W × D × H)",
        "440 × 360 × 43.6 mm"
      ]
    ],
    "tags": [
      "Gigabit",
      "48 ports",
      "10G",
      "Modular",
      "Comware",
      "Aggregation"
    ],
    "featured": false,
    "colors": [],
    "newRank": 28,
    "provenanceNote": "Official H3C product image for S5560X-54C-EI. Copyright belongs to H3C.",
    "originalImage": "assets/products/switch-h3c-s5560x-54c-ei.jpg"
  },
  {
    "id": "samsung-pm893-7-68tb",
    "name": "Samsung PM893 7.68 TB",
    "brand": "Samsung",
    "model": "MZ7L37T6HBLA-00W07",
    "category": "storage",
    "subtype": "sata-ssd",
    "categoryLabel": "Server drives · Enterprise SATA SSD",
    "image": "assets/products/web/storage-samsung-pm893-7680gb.webp",
    "imageScope": "model",
    "imageSource": "https://image.semiconductor.samsung.com/resources/data-sheet/samsung_ssd_pm893_data_sheet_rev1_0.pdf#page=1",
    "imageNote": "Manufacturer drive image. Label details may vary.",
    "sourceUrl": "https://image.semiconductor.samsung.com/resources/data-sheet/samsung_ssd_pm893_data_sheet_rev1_0.pdf",
    "sourceTitle": "Samsung V-NAND SSD PM893 Data Sheet Rev.1.0",
    "badge": "7.68 TB · SATA SSD",
    "description": "7.68 TB enterprise SATA SSD with Samsung V-NAND TLC in a 2.5-inch enclosure for application and storage servers.",
    "scenario": "Enterprise applications and SATA flash storage. Performance figures are manufacturer test maxima; results vary by workload and system.",
    "specs": [
      [
        "Capacity",
        "7.68 TB"
      ],
      [
        "Interface",
        "SATA 6 Gb/s"
      ],
      [
        "Form factor",
        "2.5-inch / 7 mm"
      ],
      [
        "NAND flash",
        "Samsung V-NAND TLC"
      ],
      [
        "Sequential read",
        "Up to 550 MB/s"
      ],
      [
        "Sequential write",
        "Up to 520 MB/s"
      ],
      [
        "Write endurance",
        "14,016 TBW"
      ]
    ],
    "tags": [
      "7.68 TB",
      "SATA SSD",
      "Enterprise SSD",
      "TLC",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Samsung PM893 7.68 TB",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 27,
    "provenanceNote": "Samsung PM893 data sheet: 7.68 TB product image. Label details and part-number suffixes may vary by production batch.",
    "originalImage": "assets/products/storage-samsung-pm893-7680gb.png"
  },
  {
    "id": "broadcom-megaraid-9560-8i",
    "name": "Broadcom MegaRAID 9560-8i 4 GB",
    "brand": "Broadcom",
    "model": "9560-8i / 05-50077-01",
    "category": "accessory",
    "subtype": "raid",
    "categoryLabel": "Components · RAID controllers",
    "image": "assets/products/web/accessory-broadcom-9560-8i.webp",
    "imageScope": "model",
    "imageSource": "https://www.broadcom.com/media/blt4ac44e0e6c6d8341/blt18448b0755572f11/604f5b6ef3117249de42f092/megaraid_9560-8i_angle_oblique.jpeg",
    "imageNote": "Manufacturer image of this RAID controller.",
    "sourceUrl": "https://docs.broadcom.com/doc/MegaRAID-9500-Tri-Mode-Storage-Adapters",
    "sourceTitle": "Broadcom MegaRAID 9500 Series Product Brief",
    "badge": "Tri-mode · 4 GB",
    "description": "PCIe 4.0 x8 tri-mode RAID controller with eight internal lanes and a 4 GB cache for SAS, SATA, and NVMe storage.",
    "scenario": "Server storage arrays. NVMe requires compatible tri-mode cables and backplanes; confirm the cache protection module when configuring the controller.",
    "specs": [
      [
        "Host interface",
        "PCIe 4.0 x8"
      ],
      [
        "Internal lanes",
        "8"
      ],
      [
        "Connector",
        "1 × x8 SFF-8654"
      ],
      [
        "Storage interfaces",
        "12 Gb/s SAS / 6 Gb/s SATA / PCIe 4.0 NVMe"
      ],
      [
        "Cache",
        "4 GB"
      ],
      [
        "RAID levels",
        "0 / 00 / 1 / 10 / 5 / 50 / 6 / 60"
      ],
      [
        "Controller",
        "SAS3908"
      ]
    ],
    "tags": [
      "RAID controller",
      "Tri-mode",
      "SAS",
      "SATA",
      "NVMe",
      "PCIe 4.0"
    ],
    "price": null,
    "imageAlt": "Broadcom MegaRAID 9560-8i 4 GB",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 26,
    "provenanceNote": "Official Broadcom MegaRAID 9560-8i product image.",
    "originalImage": "assets/products/accessory-broadcom-9560-8i.jpg"
  },
  {
    "id": "dell-poweredge-r660",
    "name": "Dell PowerEdge R660",
    "brand": "Dell",
    "model": "PowerEdge R660",
    "category": "server",
    "subtype": "rack-1u",
    "categoryLabel": "Servers · 1U rack",
    "price": null,
    "image": "assets/products/web/server-dell-poweredge-r660.webp",
    "imageAlt": "Dell PowerEdge R660",
    "imageSource": "https://i.dell.com/sites/csdocuments/Product_Docs/en/poweredge-r660-technical-guide.pdf",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://i.dell.com/sites/csdocuments/Product_Docs/en/poweredge-r660-technical-guide.pdf",
    "sourceTitle": "Dell PowerEdge R660 Technical Guide",
    "verifiedAt": "2026-10-16",
    "badge": "1U · DDR5",
    "description": "Dual-socket 1U server with DDR5 memory, PCIe Gen5 expansion, and configurable storage and networking for enterprise workloads.",
    "scenario": "High-density virtualization, database analytics, and general-purpose enterprise applications.",
    "specs": [
      [
        "Form factor",
        "1U rack / dual socket"
      ],
      [
        "Processors",
        "4th Gen Intel Xeon Scalable configuration: up to 2 processors, up to 56 cores each"
      ],
      [
        "Memory",
        "32 DDR5 RDIMM slots, up to 8 TB depending on configuration"
      ],
      [
        "Front drive bays",
        "8 or 10 × 2.5-inch SAS/SATA/NVMe chassis options"
      ],
      [
        "Rear drive bays",
        "Options for up to 2 × 2.5-inch drives"
      ],
      [
        "Expansion",
        "Up to 3 PCIe slots, with Gen4 / Gen5 configurations"
      ],
      [
        "Management",
        "iDRAC9 / OpenManage"
      ]
    ],
    "tags": [
      "Dell",
      "1U",
      "Dual socket",
      "DDR5",
      "PCIe 5.0",
      "NVMe"
    ],
    "colors": [],
    "newRank": 25,
    "provenanceNote": "Dell R660 technical guide, page 10; original front-view image width: 1650 px. Shows the 8 × 2.5-inch chassis; other drive configurations are available.",
    "originalImage": "assets/products/server-dell-poweredge-r660.png"
  },
  {
    "id": "mikrotik-crs326-24g-2s-rm",
    "name": "MikroTik CRS326-24G-2S+RM",
    "brand": "MikroTik",
    "model": "CRS326-24G-2S+RM",
    "category": "switch",
    "subtype": "access",
    "categoryLabel": "Switches · Enterprise access",
    "price": null,
    "image": "assets/products/web/switch-mikrotik-crs326-24g-2s-rm.webp",
    "imageAlt": "MikroTik CRS326-24G-2S+RM switch",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/1301_hi_res.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://mikrotik.com/product/CRS326-24G-2SplusRM",
    "sourceTitle": "MikroTik · CRS326-24G-2S+RM",
    "verifiedAt": "2026-10-16",
    "badge": "Dual-boot Gigabit access",
    "description": "24-port Gigabit switch with two 10G SFP+ ports, passive cooling, and a choice of RouterOS or SwOS.",
    "scenario": "Office access with 10G uplinks. Choose RouterOS or SwOS to suit the required management and routing functions.",
    "specs": [
      [
        "Copper ports",
        "24 × 10/100/1000 Mb/s"
      ],
      [
        "Optical ports",
        "2 × 10G SFP+"
      ],
      [
        "Operating system",
        "RouterOS / SwOS dual boot"
      ],
      [
        "Cooling",
        "Passive cooling"
      ],
      [
        "Maximum power",
        "24 W"
      ],
      [
        "Dimensions (W × D × H)",
        "443 × 144 × 44 mm"
      ]
    ],
    "tags": [
      "Gigabit",
      "24 ports",
      "10G",
      "SFP+",
      "RouterOS",
      "SwOS"
    ],
    "featured": false,
    "colors": [],
    "newRank": 24,
    "provenanceNote": "Official MikroTik product image for CRS326-24G-2S+RM. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/switch-mikrotik-crs326-24g-2s-rm.png"
  },
  {
    "id": "samsung-pm9a3-3-84tb",
    "name": "Samsung PM9A3 3.84 TB",
    "brand": "Samsung",
    "model": "MZQL23T8HCLS-00W07",
    "category": "storage",
    "subtype": "nvme-ssd",
    "categoryLabel": "Server drives · Enterprise NVMe SSD",
    "image": "assets/products/web/storage-samsung-pm9a3-3840gb.webp",
    "imageScope": "series",
    "imageSource": "https://download.semiconductor.samsung.com/resources/data-sheet/Samsung_SSD_PM9A3_Data_Sheet_Rev1.0.pdf#page=1",
    "imageNote": "Manufacturer series image. Capacity and interface may vary; refer to the listed part number.",
    "sourceUrl": "https://download.semiconductor.samsung.com/resources/data-sheet/Samsung_SSD_PM9A3_Data_Sheet_Rev1.0.pdf",
    "sourceTitle": "Samsung V-NAND SSD PM9A3 Data Sheet Rev.1.0",
    "badge": "3.84 TB · U.2",
    "description": "3.84 TB U.2 enterprise SSD with PCIe 4.0 x4, NVMe 1.4, and Samsung V-NAND TLC for data center storage.",
    "scenario": "NVMe storage nodes and enterprise servers. Confirm U.2 NVMe backplane support; 2.5-inch dimensions alone do not establish compatibility.",
    "specs": [
      [
        "Capacity",
        "3.84 TB"
      ],
      [
        "Interface",
        "PCIe 4.0 x4 / NVMe 1.4"
      ],
      [
        "Form factor",
        "2.5-inch U.2 / 7 mm"
      ],
      [
        "NAND flash",
        "Samsung V-NAND TLC"
      ],
      [
        "Sequential read",
        "Up to 6,900 MB/s"
      ],
      [
        "Sequential write",
        "Up to 4,100 MB/s"
      ],
      [
        "Write endurance",
        "7,008 TBW"
      ]
    ],
    "tags": [
      "3.84 TB",
      "NVMe SSD",
      "U.2",
      "PCIe 4.0",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Samsung PM9A3 3.84 TB — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 23,
    "provenanceNote": "Samsung PM9A3 U.2 series image. The enclosure does not identify capacity; this listing specifies MZQL23T8HCLS-00W07, 3.84 TB.",
    "originalImage": "assets/products/storage-samsung-pm9a3-3840gb.png"
  },
  {
    "id": "kingston-ksm32rs4-32mfr",
    "name": "Kingston Server Premier 32 GB DDR4",
    "brand": "Kingston",
    "model": "KSM32RS4/32MFR",
    "category": "accessory",
    "subtype": "memory",
    "categoryLabel": "Components · ECC RDIMM memory",
    "image": "assets/products/web/accessory-kingston-ksm32rs4.webp",
    "imageScope": "series",
    "imageSource": "https://media.kingston.com/kingston/headers/ktc-header-category-memory-server-premier-hd-md.jpg",
    "imageNote": "Manufacturer series image. Specifications apply to the listed module; layout may vary.",
    "sourceUrl": "https://www.kingston.com/datasheets/KSM32RS4_32MFR.pdf",
    "sourceTitle": "Kingston KSM32RS4/32MFR Memory Module Specifications",
    "badge": "32 GB · ECC RDIMM",
    "description": "32 GB DDR4-3200 ECC RDIMM with 1Rx4 organization, CL22 timings, and a 288-pin connector for compatible server platforms.",
    "scenario": "DDR4 ECC RDIMM expansion. Check the server QVL, processor memory population rules, and existing DIMM organization.",
    "specs": [
      [
        "Capacity",
        "32 GB"
      ],
      [
        "Type",
        "DDR4 ECC Registered DIMM"
      ],
      [
        "Data rate",
        "3200 MT/s"
      ],
      [
        "Rank organization",
        "1Rx4"
      ],
      [
        "Timings",
        "CL22 / 22-22-22"
      ],
      [
        "Voltage",
        "1.2 V"
      ],
      [
        "Pin count",
        "288-pin"
      ]
    ],
    "tags": [
      "Server memory",
      "DDR4",
      "32 GB",
      "ECC",
      "RDIMM",
      "3200 MT/s"
    ],
    "price": null,
    "imageAlt": "Kingston Server Premier 32 GB DDR4 — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 22,
    "provenanceNote": "Official Kingston Server Premier series group image. Specifications apply to KSM32RS4/32MFR; this is not a label photograph of that individual module.",
    "originalImage": "assets/products/accessory-kingston-ksm32rs4.jpg"
  },
  {
    "id": "dell-poweredge-r750",
    "name": "Dell PowerEdge R750",
    "brand": "Dell",
    "model": "PowerEdge R750",
    "category": "server",
    "subtype": "rack-2u",
    "categoryLabel": "Servers · 2U rack",
    "price": null,
    "image": "assets/products/web/server-dell-poweredge-r750.webp",
    "imageAlt": "Dell PowerEdge R750 — rear view",
    "imageSource": "https://i.dell.com/sites/csdocuments/product_docs/en/poweredge-r750-technical-guide.pdf",
    "imageScope": "model",
    "imageNote": "Manufacturer rear-view image. Rear drive bays and I/O vary by configuration.",
    "sourceUrl": "https://i.dell.com/sites/csdocuments/product_docs/en/poweredge-r750-technical-guide.pdf",
    "sourceTitle": "Dell PowerEdge R750 Technical Guide",
    "verifiedAt": "2026-10-16",
    "badge": "2U expansion",
    "description": "Dual-socket 2U server with DDR4 memory and up to eight PCIe Gen4 slots for compute and storage workloads.",
    "scenario": "Virtualization, database analytics, and storage-intensive enterprise applications.",
    "specs": [
      [
        "Form factor",
        "2U rack / dual socket"
      ],
      [
        "Processors",
        "Up to 2 × 3rd Gen Intel Xeon Scalable processors, up to 40 cores each"
      ],
      [
        "Memory",
        "32 DDR4 DIMM slots, up to 3200 MT/s"
      ],
      [
        "Front drive bays",
        "Options for up to 24 × 2.5-inch or 12 × 3.5-inch drives"
      ],
      [
        "Storage interfaces",
        "SAS/SATA/NVMe options, depending on backplane and controller configuration"
      ],
      [
        "Expansion",
        "Up to 8 PCIe Gen4 slots, depending on riser configuration"
      ],
      [
        "Management",
        "iDRAC9 / OpenManage"
      ]
    ],
    "tags": [
      "Dell",
      "2U",
      "Dual socket",
      "DDR4",
      "PCIe 4.0",
      "Database"
    ],
    "colors": [],
    "newRank": 21,
    "imageView": "rear",
    "provenanceNote": "Dell R750 technical guide, page 10, figure 10; original rear-view image width: 1630 px. Shows a configuration with two rear drive bays, six PCIe slots, and power supplies.",
    "originalImage": "assets/products/server-dell-poweredge-r750.png"
  },
  {
    "id": "mikrotik-crs328-24p-4s-rm",
    "name": "MikroTik CRS328-24P-4S+RM",
    "brand": "MikroTik",
    "model": "CRS328-24P-4S+RM",
    "category": "switch",
    "subtype": "access",
    "categoryLabel": "Switches · Enterprise access",
    "price": null,
    "image": "assets/products/web/switch-mikrotik-crs328-24p-4s-rm.webp",
    "imageAlt": "MikroTik CRS328-24P-4S+RM switch",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/1493_hi_res.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://mikrotik.com/product/crs328_24p_4s_rm",
    "sourceTitle": "MikroTik · CRS328-24P-4S+RM",
    "verifiedAt": "2026-10-16",
    "badge": "24-port PoE access",
    "description": "24-port Gigabit PoE switch with four 10G SFP+ uplinks and a 450 W budget for powered endpoints.",
    "scenario": "Wireless APs, IP phones, and cameras. Allow for per-port limits and the 150 W budget per eight-port group.",
    "specs": [
      [
        "Copper ports",
        "24 × Gigabit PoE"
      ],
      [
        "Uplink ports",
        "4 × 10G SFP+"
      ],
      [
        "PoE standards",
        "802.3af/at; passive PoE supported"
      ],
      [
        "PoE budget",
        "450 W (150 W per group of 8 ports)"
      ],
      [
        "PoE per port (max.)",
        "30 W"
      ],
      [
        "Operating system",
        "RouterOS / SwOS dual boot"
      ],
      [
        "Dimensions (W × D × H)",
        "443 × 300 × 44 mm"
      ]
    ],
    "tags": [
      "Gigabit",
      "PoE",
      "24 ports",
      "450W",
      "SFP+",
      "AP"
    ],
    "featured": false,
    "colors": [],
    "newRank": 20,
    "provenanceNote": "Official MikroTik product image for CRS328-24P-4S+RM. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/switch-mikrotik-crs328-24p-4s-rm.png"
  },
  {
    "id": "kingston-dc600m-1-92tb",
    "name": "Kingston DC600M 1.92 TB",
    "brand": "Kingston",
    "model": "SEDC600M/1920G",
    "category": "storage",
    "subtype": "sata-ssd",
    "categoryLabel": "Server drives · Enterprise SATA SSD",
    "image": "assets/products/web/storage-kingston-dc600m.webp",
    "imageScope": "series",
    "imageSource": "https://media.kingston.com/kingston/key-features/ktc-keyfeatures-ssd-dc600-kf5-lg.jpg",
    "imageNote": "Manufacturer series image. Capacity and interface may vary; refer to the listed part number.",
    "sourceUrl": "https://www.kingston.com/cn/memory/search?partid=SEDC600M%2F1920G",
    "sourceTitle": "Kingston SEDC600M/1920G Official Product Page",
    "badge": "1.92 TB · SATA SSD",
    "description": "1.92 TB enterprise SATA SSD with 3D TLC NAND and hardware power-loss protection for mixed read/write workloads.",
    "scenario": "Mixed read/write workloads and SATA storage upgrades. Size drive endurance to the expected write volume.",
    "specs": [
      [
        "Capacity",
        "1.92 TB"
      ],
      [
        "Interface",
        "SATA 6 Gb/s"
      ],
      [
        "Form factor",
        "2.5-inch / 7 mm"
      ],
      [
        "NAND flash",
        "3D TLC"
      ],
      [
        "Sequential read",
        "Up to 560 MB/s"
      ],
      [
        "Sequential write",
        "Up to 530 MB/s"
      ],
      [
        "Power-loss protection",
        "Onboard hardware PLP"
      ]
    ],
    "tags": [
      "1.92 TB",
      "SATA SSD",
      "PLP",
      "Mixed-use workloads",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Kingston DC600M 1.92 TB — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 19,
    "provenanceNote": "Official Kingston DC600M series application image. The specified capacity corresponds to SEDC600M/1920G.",
    "originalImage": "assets/products/storage-kingston-dc600m.jpg"
  },
  {
    "id": "mikrotik-s-85dlc03d",
    "model": "S+85DLC03D",
    "subtype": "transceiver",
    "sourceUrl": "https://mikrotik.com/product/Splus85DLC03D",
    "badge": "10G multimode optics",
    "description": "850 nm multimode SFP+ transceiver with duplex LC UPC connectors, supporting 1/10 Gb/s links up to 300 m.",
    "scenario": "Short multimode fiber links in server rooms. Check device compatibility, fiber type, and the optical power budget at both ends.",
    "specs": [
      [
        "Form factor",
        "SFP+"
      ],
      [
        "Connector",
        "Duplex LC UPC"
      ],
      [
        "Data rate",
        "1 / 10 Gb/s"
      ],
      [
        "Wavelength",
        "850 nm"
      ],
      [
        "Fiber type",
        "Multimode (MM)"
      ],
      [
        "Reach",
        "Up to 300 m"
      ],
      [
        "Tested ambient temperature",
        "-40 to +70 °C"
      ]
    ],
    "tags": [
      "10G",
      "SFP+",
      "850nm",
      "Multimode",
      "Optical transceiver",
      "300m"
    ],
    "name": "MikroTik S+85DLC03D",
    "brand": "MikroTik",
    "category": "accessory",
    "categoryLabel": "Components · Optical transceivers",
    "price": null,
    "image": "assets/products/web/accessory-network-mikrotik-s-85dlc03d.webp",
    "imageAlt": "MikroTik S+85DLC03D optical transceiver",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/813_hi_res.png",
    "imageNote": "Manufacturer image of this optical transceiver.",
    "imageScope": "model",
    "sourceTitle": "MikroTik · S+85DLC03D",
    "verifiedAt": "2026-10-16",
    "featured": false,
    "colors": [],
    "newRank": 18,
    "compatibilityNote": "Check the exact switch model, firmware, and port mode against the manufacturer compatibility list. Matching form factors and speeds alone do not establish compatibility.",
    "provenanceNote": "Official MikroTik S+85DLC03D product image. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/accessory-network-mikrotik-s-85dlc03d.png"
  },
  {
    "id": "lenovo-thinksystem-sr650-v3",
    "name": "Lenovo ThinkSystem SR650 V3",
    "brand": "Lenovo",
    "model": "ThinkSystem SR650 V3",
    "category": "server",
    "subtype": "rack-2u",
    "categoryLabel": "Servers · 2U rack",
    "price": null,
    "image": "assets/products/web/server-lenovo-thinksystem-sr650-v3.webp",
    "imageAlt": "Lenovo ThinkSystem SR650 V3",
    "imageSource": "https://lenovopress.lenovo.com/assets/images/LP1601/SR650%20V3%20Shanghai%20front%20angled%20left.jpg",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://lenovopress.lenovo.com/lp1601-thinksystem-sr650-v3-server",
    "sourceTitle": "Lenovo ThinkSystem SR650 V3 Product Guide",
    "verifiedAt": "2026-10-16",
    "badge": "2U · DDR5",
    "description": "Dual-socket 2U server with DDR5 memory, PCIe Gen5 expansion, and flexible drive configurations for virtualization and enterprise storage.",
    "scenario": "Enterprise virtualization, databases, and software-defined storage.",
    "specs": [
      [
        "Form factor",
        "2U rack / dual socket"
      ],
      [
        "Processors",
        "1–2 × 4th / 5th Gen Intel Xeon Scalable processors"
      ],
      [
        "Memory",
        "32 DDR5 DIMM slots; up to 8 TB in a dual-socket configuration"
      ],
      [
        "Memory speed",
        "Up to 5600 MT/s at 1DPC with 5th Gen processors and compatible RDIMMs"
      ],
      [
        "Front drive bays",
        "Options for up to 24 × 2.5-inch or 12 × 3.5-inch drives"
      ],
      [
        "Expansion",
        "PCIe Gen5 and OCP 3.0 network adapter support"
      ],
      [
        "Management",
        "Lenovo XClarity Controller 2"
      ]
    ],
    "tags": [
      "Lenovo",
      "2U",
      "Dual socket",
      "DDR5",
      "PCIe 5.0",
      "Virtualization"
    ],
    "colors": [],
    "newRank": 17,
    "provenanceNote": "Lenovo SR650 V3 product guide, figure 1; original image width: 1500 px. Shows front 2.5-inch drive bays and the SR650 V3 chassis label.",
    "originalImage": "assets/products/server-lenovo-thinksystem-sr650-v3.png"
  },
  {
    "id": "mikrotik-crs309-1g-8s-in",
    "name": "MikroTik CRS309-1G-8S+IN",
    "brand": "MikroTik",
    "model": "CRS309-1G-8S+IN",
    "category": "switch",
    "subtype": "aggregation",
    "categoryLabel": "Switches · Aggregation",
    "price": null,
    "image": "assets/products/web/switch-mikrotik-crs309-1g-8s-in.webp",
    "imageAlt": "MikroTik CRS309-1G-8S+IN switch",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/1730_hi_res.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://mikrotik.com/product/crs309_1g_8s_in",
    "sourceTitle": "MikroTik · CRS309-1G-8S+IN",
    "verifiedAt": "2026-10-16",
    "badge": "8-port 10G aggregation",
    "description": "Compact eight-port 10G SFP+ switch with passive cooling, a Gigabit Ethernet port, and RouterOS / SwOS dual boot.",
    "scenario": "10G aggregation in small server rooms. Select compatible transceivers or DAC cables for each link.",
    "specs": [
      [
        "Optical ports",
        "8 × 10G SFP+"
      ],
      [
        "Copper ports",
        "1 × Gigabit Ethernet"
      ],
      [
        "Switching capacity",
        "162 Gb/s"
      ],
      [
        "Non-blocking throughput",
        "81 Gb/s"
      ],
      [
        "Cooling",
        "Passive cooling"
      ],
      [
        "Maximum power",
        "23 W"
      ],
      [
        "Operating system",
        "RouterOS / SwOS dual boot"
      ]
    ],
    "tags": [
      "10G",
      "SFP+",
      "8 ports",
      "Passive cooling",
      "Aggregation"
    ],
    "featured": false,
    "colors": [],
    "newRank": 16,
    "provenanceNote": "Official MikroTik product image for CRS309-1G-8S+IN. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/switch-mikrotik-crs309-1g-8s-in.png"
  },
  {
    "id": "kingston-dc2000b-480gb",
    "name": "Kingston DC2000B 480 GB",
    "brand": "Kingston",
    "model": "SEDC2000BM8/480G",
    "category": "storage",
    "subtype": "nvme-ssd",
    "categoryLabel": "Server drives · M.2 boot SSD",
    "image": "assets/products/web/storage-kingston-dc2000b.webp",
    "imageScope": "series",
    "imageSource": "https://media.kingston.com/kingston/key-features/ktc-keyfeatures-ssd-dc2000b-kf1-lg.jpg",
    "imageNote": "Manufacturer series image. Capacity and interface may vary; refer to the listed part number.",
    "sourceUrl": "https://www.kingston.com/datasheets/SEDC2000B_en.pdf",
    "sourceTitle": "Kingston DC2000B PCIe 4.0 NVMe M.2 SSD Data Sheet",
    "badge": "480 GB · M.2",
    "description": "480 GB M.2 2280 NVMe SSD with PCIe 4.0 x4, a heatsink, and hardware power-loss protection for server boot storage.",
    "scenario": "Server boot storage. Confirm M.2 2280 fit, NVMe support, and heatsink clearance.",
    "specs": [
      [
        "Capacity",
        "480 GB"
      ],
      [
        "Interface",
        "PCIe 4.0 x4 / NVMe"
      ],
      [
        "Form factor",
        "M.2 2280 / with heatsink"
      ],
      [
        "NAND flash",
        "3D TLC"
      ],
      [
        "Sequential read",
        "Up to 7,000 MB/s"
      ],
      [
        "Sequential write",
        "Up to 800 MB/s"
      ],
      [
        "Write endurance",
        "350 TBW"
      ]
    ],
    "tags": [
      "480 GB",
      "M.2",
      "NVMe SSD",
      "Boot drive",
      "PLP",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Kingston DC2000B 480 GB — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 15,
    "provenanceNote": "Official Kingston DC2000B series application image. This listing specifies the 480 GB model with a heatsink.",
    "originalImage": "assets/products/storage-kingston-dc2000b.jpg"
  },
  {
    "id": "mikrotik-s-31dlc10d",
    "model": "S+31DLC10D",
    "subtype": "transceiver",
    "sourceUrl": "https://mikrotik.com/product/s_31dlc10d",
    "badge": "10G single-mode optics",
    "description": "1310 nm single-mode SFP+ transceiver with duplex LC connectors and digital diagnostics, supporting 1/10 Gb/s links up to 10 km.",
    "scenario": "Single-mode links between buildings or across campuses. Check device compatibility, fiber specifications, and the optical power budget.",
    "specs": [
      [
        "Form factor",
        "SFP+"
      ],
      [
        "Connector",
        "Duplex LC, full duplex"
      ],
      [
        "Data rate",
        "1 / 10 Gb/s"
      ],
      [
        "Wavelength",
        "1310 nm"
      ],
      [
        "Fiber type",
        "Single-mode (SM)"
      ],
      [
        "Reach",
        "Up to 10 km"
      ],
      [
        "Digital diagnostics",
        "DDM: optical power, voltage, temperature, and laser bias current"
      ]
    ],
    "tags": [
      "10G",
      "SFP+",
      "1310nm",
      "Single-mode",
      "Optical transceiver",
      "10km",
      "DDM"
    ],
    "name": "MikroTik S+31DLC10D",
    "brand": "MikroTik",
    "category": "accessory",
    "categoryLabel": "Components · Optical transceivers",
    "price": null,
    "image": "assets/products/web/accessory-network-mikrotik-s-31dlc10d.webp",
    "imageAlt": "MikroTik S+31DLC10D optical transceiver",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/2514_hi_res.png",
    "imageNote": "Manufacturer image of this optical transceiver.",
    "imageScope": "model",
    "sourceTitle": "MikroTik · S+31DLC10D",
    "verifiedAt": "2026-10-16",
    "featured": false,
    "colors": [],
    "newRank": 14,
    "compatibilityNote": "Check the exact switch model, firmware, and port mode against the manufacturer compatibility list. Matching form factors and speeds alone do not establish compatibility.",
    "provenanceNote": "Official MikroTik S+31DLC10D product image. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/accessory-network-mikrotik-s-31dlc10d.png"
  },
  {
    "id": "lenovo-thinksystem-sr630-v3",
    "name": "Lenovo ThinkSystem SR630 V3",
    "brand": "Lenovo",
    "model": "ThinkSystem SR630 V3",
    "category": "server",
    "subtype": "rack-1u",
    "categoryLabel": "Servers · 1U rack",
    "price": null,
    "image": "assets/products/web/server-lenovo-thinksystem-sr630-v3.webp",
    "imageAlt": "Lenovo ThinkSystem SR630 V3",
    "imageSource": "https://lenovopress.lenovo.com/assets/images/LP1600/SR630%20V3%20New%20York%2010x25%20front%20angled%20left.jpg",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://lenovopress.lenovo.com/lp1600-thinksystem-sr630-v3-server",
    "sourceTitle": "Lenovo ThinkSystem SR630 V3 Product Guide",
    "verifiedAt": "2026-10-16",
    "badge": "1U · DDR5",
    "description": "Dual-socket 1U server supporting 4th or 5th Gen Intel Xeon Scalable processors and 32 DDR5 DIMM slots.",
    "scenario": "Data center virtualization, enterprise applications, databases, and network services.",
    "specs": [
      [
        "Form factor",
        "1U rack / dual socket"
      ],
      [
        "Processors",
        "1–2 × 4th / 5th Gen Intel Xeon Scalable processors"
      ],
      [
        "Memory",
        "32 DDR5 DIMM slots, up to 8 TB (32 × 256 GB)"
      ],
      [
        "Front drive bays",
        "Options for up to 10 × 2.5-inch, 4 × 3.5-inch, or EDSFF chassis"
      ],
      [
        "Rear drive bays",
        "Optional 2 × 2.5-inch drives, depending on chassis configuration"
      ],
      [
        "Expansion",
        "PCIe Gen5 and OCP 3.0 networking expansion"
      ],
      [
        "Management",
        "Lenovo XClarity Controller 2"
      ]
    ],
    "tags": [
      "Lenovo",
      "1U",
      "Dual socket",
      "DDR5",
      "NVMe",
      "Database"
    ],
    "colors": [],
    "newRank": 13,
    "provenanceNote": "Lenovo SR630 V3 product guide, figure 1; original image width: 1500 px. Shows the 10 × 2.5-inch chassis and the SR630 V3 label.",
    "originalImage": "assets/products/server-lenovo-thinksystem-sr630-v3.png"
  },
  {
    "id": "mikrotik-crs312-4c-8xg-rm",
    "name": "MikroTik CRS312-4C+8XG-RM",
    "brand": "MikroTik",
    "model": "CRS312-4C+8XG-RM",
    "category": "switch",
    "subtype": "aggregation",
    "categoryLabel": "Switches · Aggregation",
    "price": null,
    "image": "assets/products/web/switch-mikrotik-crs312-4c-8xg-rm.webp",
    "imageAlt": "MikroTik CRS312-4C+8XG-RM switch",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/1825_hi_res.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://mikrotik.com/product/crs312_4c_8xg_rm",
    "sourceTitle": "MikroTik · CRS312-4C+8XG-RM",
    "verifiedAt": "2026-10-16",
    "badge": "10G copper / fiber",
    "description": "10G switch with eight multi-gigabit RJ45 ports and four RJ45/SFP+ combo ports for mixed copper and fiber networks.",
    "scenario": "10G links for workstations, storage, and servers. Each combo port uses either its RJ45 or SFP+ interface.",
    "specs": [
      [
        "Fixed copper ports",
        "8 × 1/2.5/5/10G RJ45"
      ],
      [
        "Combo ports",
        "4 × 10G RJ45 / SFP+ combo pairs (one interface active per pair)"
      ],
      [
        "Switching capacity",
        "240 Gb/s"
      ],
      [
        "Non-blocking throughput",
        "120 Gb/s"
      ],
      [
        "Power supplies",
        "Dual AC inputs with redundant power support"
      ],
      [
        "Operating system",
        "RouterOS v7 / SwOS"
      ],
      [
        "Dimensions (W × D × H)",
        "443 × 183 × 44 mm"
      ]
    ],
    "tags": [
      "10G",
      "10GBASE-T",
      "Multi-gigabit",
      "Combo",
      "SFP+",
      "Aggregation"
    ],
    "featured": false,
    "colors": [],
    "newRank": 12,
    "provenanceNote": "Official MikroTik product image for CRS312-4C+8XG-RM. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/switch-mikrotik-crs312-4c-8xg-rm.png"
  },
  {
    "id": "kingston-dc3000me-3-84tb",
    "name": "Kingston DC3000ME 3.84 TB",
    "brand": "Kingston",
    "model": "SEDC3000ME/3T8",
    "category": "storage",
    "subtype": "nvme-ssd",
    "categoryLabel": "Server drives · Enterprise NVMe SSD",
    "image": "assets/products/web/storage-kingston-dc3000me.webp",
    "imageScope": "series",
    "imageSource": "https://media.kingston.com/kingston/key-features/ktc-keyfeatures-ssd-dc3000me-kf1-lg.jpg",
    "imageNote": "Manufacturer series image. Capacity and interface may vary; refer to the listed part number.",
    "sourceUrl": "https://www.kingston.com/datasheets/SEDC3000ME_us.pdf",
    "sourceTitle": "Kingston DC3000ME Enterprise NVMe U.2 SSD Data Sheet",
    "badge": "3.84 TB · PCIe 5.0",
    "description": "3.84 TB U.2 enterprise SSD with PCIe 5.0 x4, 3D eTLC NAND, and hardware power-loss protection for high-bandwidth storage.",
    "scenario": "High-bandwidth storage and database servers. Check 15 mm U.2 bay clearance, PCIe lanes, and cooling.",
    "specs": [
      [
        "Capacity",
        "3.84 TB"
      ],
      [
        "Interface",
        "PCIe 5.0 x4 / NVMe"
      ],
      [
        "Form factor",
        "2.5-inch U.2 / 15 mm"
      ],
      [
        "NAND flash",
        "3D eTLC"
      ],
      [
        "Sequential read",
        "Up to 14,000 MB/s"
      ],
      [
        "Sequential write",
        "Up to 5,800 MB/s"
      ],
      [
        "Write endurance",
        "7,008 TBW"
      ]
    ],
    "tags": [
      "3.84 TB",
      "NVMe SSD",
      "U.2",
      "PCIe 5.0",
      "PLP",
      "Server drives"
    ],
    "price": null,
    "imageAlt": "Kingston DC3000ME 3.84 TB — series image",
    "verifiedAt": "2026-10-16",
    "colors": [],
    "newRank": 11,
    "provenanceNote": "Official Kingston DC3000ME series application image. The specified capacity corresponds to SEDC3000ME/3T8.",
    "originalImage": "assets/products/storage-kingston-dc3000me.jpg"
  },
  {
    "id": "mikrotik-s-da0001",
    "model": "S+DA0001",
    "subtype": "cable",
    "sourceUrl": "https://mikrotik.com/product/SplusDA0001",
    "badge": "10G DAC · Discontinued",
    "lifecycle": "discontinued",
    "description": "1 m SFP+ direct-attach copper cable for 1/10 Gb/s links; discontinued by MikroTik and listed for legacy system maintenance.",
    "scenario": "Maintenance of existing SFP+ systems. Confirm remaining availability and DAC support at both endpoints.",
    "specs": [
      [
        "Connector",
        "SFP+ to SFP+"
      ],
      [
        "Cable type",
        "Direct-attach copper (DAC)"
      ],
      [
        "Data rate",
        "1 / 10 Gb/s"
      ],
      [
        "Cable length",
        "1 m"
      ],
      [
        "Compliance",
        "SFP+ MSA-compliant"
      ],
      [
        "Product status",
        "Discontinued by manufacturer; maintenance reference"
      ]
    ],
    "tags": [
      "10G",
      "SFP+",
      "DAC",
      "Direct attach copper",
      "1m",
      "Discontinued maintenance"
    ],
    "name": "MikroTik S+DA0001",
    "brand": "MikroTik",
    "category": "accessory",
    "categoryLabel": "Components · Direct-attach cables",
    "price": null,
    "image": "assets/products/web/accessory-network-mikrotik-s-da0001.webp",
    "imageAlt": "MikroTik S+DA0001 direct-attach cable",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/863_hi_res.png",
    "imageNote": "Manufacturer image of this cable.",
    "imageScope": "model",
    "sourceTitle": "MikroTik · S+DA0001",
    "verifiedAt": "2026-10-16",
    "featured": false,
    "colors": [],
    "newRank": 10,
    "compatibilityNote": "Check the exact switch model, firmware, and port mode against the manufacturer compatibility list. Matching form factors and speeds alone do not establish compatibility.",
    "provenanceNote": "Official MikroTik S+DA0001 product image. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/accessory-network-mikrotik-s-da0001.png"
  },
  {
    "id": "lenovo-thinksystem-sr250-v3",
    "name": "Lenovo ThinkSystem SR250 V3",
    "brand": "Lenovo",
    "model": "ThinkSystem SR250 V3",
    "category": "server",
    "subtype": "rack-1u",
    "categoryLabel": "Servers · 1U rack",
    "price": null,
    "image": "assets/products/web/server-lenovo-thinksystem-sr250-v3.webp",
    "imageAlt": "Lenovo ThinkSystem SR250 V3",
    "imageSource": "https://lenovopress.lenovo.com/assets/images/LP1802/SR250%20V3%20Cayuga%20front%20angled%20left%204x35.jpg",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://lenovopress.lenovo.com/lp1802-thinksystem-sr250-v3-server",
    "sourceTitle": "Lenovo ThinkSystem SR250 V3 Product Guide",
    "verifiedAt": "2026-10-16",
    "badge": "1U single socket · DDR5",
    "description": "Single-socket 1U server with ECC DDR5 memory, optional hot-swap storage, and remote management for branch offices and retail systems.",
    "scenario": "Branch offices, retail systems, entry-level virtualization, and web services.",
    "specs": [
      [
        "Form factor",
        "1U rack / single socket"
      ],
      [
        "Processors",
        "Intel Xeon 6300 series or Xeon E-2400; Pentium options also available"
      ],
      [
        "Memory",
        "4 DDR5 ECC UDIMM slots, up to 128 GB / 4800 MT/s"
      ],
      [
        "Drive bays",
        "Up to 10 × 2.5-inch or 4 × 3.5-inch drives"
      ],
      [
        "Expansion",
        "Up to 3 PCIe slots, including PCIe Gen5 options"
      ],
      [
        "Networking",
        "Onboard dual-port 1GbE"
      ],
      [
        "Management",
        "Lenovo XClarity Controller 2"
      ]
    ],
    "tags": [
      "Lenovo",
      "1U",
      "Single socket",
      "DDR5",
      "Branch office"
    ],
    "colors": [],
    "newRank": 9,
    "provenanceNote": "Lenovo SR250 V3 product guide, figure 1; original image width: 1500 px. Shows the chassis with 4 × 3.5-inch hot-swap bays.",
    "originalImage": "assets/products/server-lenovo-thinksystem-sr250-v3.png"
  },
  {
    "id": "mikrotik-crs317-1g-16s-rm",
    "name": "MikroTik CRS317-1G-16S+RM",
    "brand": "MikroTik",
    "model": "CRS317-1G-16S+RM",
    "category": "switch",
    "subtype": "aggregation",
    "categoryLabel": "Switches · Aggregation",
    "price": null,
    "image": "assets/products/web/switch-mikrotik-crs317-1g-16s-rm.webp",
    "imageAlt": "MikroTik CRS317-1G-16S+RM switch",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/1324_hi_res.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://mikrotik.com/product/crs317_1g_16s_rm",
    "sourceTitle": "MikroTik · CRS317-1G-16S+RM",
    "verifiedAt": "2026-10-16",
    "badge": "16-port 10G aggregation",
    "description": "16-port 10G SFP+ rack switch with dual redundant power supplies and a Gigabit Ethernet management port.",
    "scenario": "10G aggregation between servers and access switches. Match transceivers and cables to link distance.",
    "specs": [
      [
        "Optical ports",
        "16 × 10G SFP+"
      ],
      [
        "Management port",
        "1 × Gigabit Ethernet"
      ],
      [
        "Power supplies",
        "Dual redundant power supplies, 2 AC inputs"
      ],
      [
        "Memory",
        "1 GB"
      ],
      [
        "Processor",
        "Dual-core 800 MHz"
      ],
      [
        "Operating system",
        "RouterOS / SwOS dual boot"
      ],
      [
        "Dimensions (W × D × H)",
        "443 × 224 × 44 mm"
      ]
    ],
    "tags": [
      "10G",
      "16 ports",
      "SFP+",
      "Dual power supplies",
      "Rackmount",
      "Aggregation"
    ],
    "featured": false,
    "colors": [],
    "newRank": 8,
    "provenanceNote": "Official MikroTik product image for CRS317-1G-16S+RM. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/switch-mikrotik-crs317-1g-16s-rm.png"
  },
  {
    "id": "mikrotik-xs-da0001",
    "model": "XS+DA0001",
    "subtype": "cable",
    "sourceUrl": "https://mikrotik.com/product/xs_da0001",
    "badge": "25G DAC · 1 m",
    "description": "1 m SFP28 direct-attach copper cable supporting 1/10/25 Gb/s connections within a rack or between adjacent racks.",
    "scenario": "Short rack-to-rack links. Verify DAC compatibility, port modes, and supported speeds at both endpoints.",
    "specs": [
      [
        "Form factor",
        "SFP28"
      ],
      [
        "Cable type",
        "Direct-attach copper (DAC)"
      ],
      [
        "Transmission medium",
        "Copper"
      ],
      [
        "Data rate",
        "1 / 10 / 25 Gb/s"
      ],
      [
        "Cable length",
        "1 m"
      ],
      [
        "Compliance",
        "SFP+ MSA-compliant"
      ]
    ],
    "tags": [
      "25G",
      "10G",
      "SFP28",
      "SFP+",
      "DAC",
      "Direct attach copper",
      "1m"
    ],
    "name": "MikroTik XS+DA0001",
    "brand": "MikroTik",
    "category": "accessory",
    "categoryLabel": "Components · Direct-attach cables",
    "price": null,
    "image": "assets/products/web/accessory-network-mikrotik-xs-da0001.webp",
    "imageAlt": "MikroTik XS+DA0001 direct-attach cable",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/2003_hi_res.png",
    "imageNote": "Manufacturer image of this cable.",
    "imageScope": "model",
    "sourceTitle": "MikroTik · XS+DA0001",
    "verifiedAt": "2026-10-16",
    "featured": false,
    "colors": [],
    "newRank": 7,
    "compatibilityNote": "Check the exact switch model, firmware, and port mode against the manufacturer compatibility list. Matching form factors and speeds alone do not establish compatibility.",
    "provenanceNote": "Official MikroTik XS+DA0001 product image. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/accessory-network-mikrotik-xs-da0001.png"
  },
  {
    "id": "lenovo-thinksystem-st250-v3",
    "name": "Lenovo ThinkSystem ST250 V3",
    "brand": "Lenovo",
    "model": "ThinkSystem ST250 V3",
    "category": "server",
    "subtype": "tower",
    "categoryLabel": "Servers · Tower",
    "price": null,
    "image": "assets/products/web/server-lenovo-thinksystem-st250-v3.webp",
    "imageAlt": "Lenovo ThinkSystem ST250 V3",
    "imageSource": "https://lenovopress.lenovo.com/assets/images/LP1803/ST250%20V3%20front%20angled%20right%208x35%20HS.jpg",
    "imageScope": "model",
    "imageNote": "Manufacturer image. Drive bays and components vary by configuration.",
    "sourceUrl": "https://lenovopress.lenovo.com/lp1803-thinksystem-st250-v3-server",
    "sourceTitle": "Lenovo ThinkSystem ST250 V3 Product Guide",
    "verifiedAt": "2026-10-16",
    "badge": "Single-socket tower · DDR5",
    "description": "Single-socket tower server with DDR5 memory and flexible drive options, with 4U rack installation available through an optional kit.",
    "scenario": "Small businesses, branch offices, retail sites, and edge applications.",
    "specs": [
      [
        "Form factor",
        "Single-socket tower; converts to 4U rack installation with the appropriate kit"
      ],
      [
        "Processors",
        "Intel Xeon 6300 series or Xeon E-2400; Pentium options also available"
      ],
      [
        "Memory",
        "4 DDR5 ECC UDIMM slots, up to 128 GB / 4800 MT/s"
      ],
      [
        "Drive bays",
        "Up to 8 × 3.5-inch or 16 × 2.5-inch drives; mixed configurations also available"
      ],
      [
        "Expansion",
        "4 PCIe slots, including 1 PCIe Gen5 slot"
      ],
      [
        "Management",
        "Lenovo XClarity Controller 2"
      ]
    ],
    "tags": [
      "Lenovo",
      "Tower",
      "Single socket",
      "DDR5",
      "Branch office"
    ],
    "colors": [],
    "newRank": 6,
    "provenanceNote": "Lenovo ST250 V3 product guide; original image: 756 × 1200 px. Shows a tower with 8 × 3.5-inch hot-swap bays and an optional optical drive.",
    "originalImage": "assets/products/server-lenovo-thinksystem-st250-v3.png"
  },
  {
    "id": "mikrotik-crs504-4xq-in",
    "name": "MikroTik CRS504-4XQ-IN",
    "brand": "MikroTik",
    "model": "CRS504-4XQ-IN",
    "category": "switch",
    "subtype": "datacenter",
    "categoryLabel": "Switches · Data center",
    "price": null,
    "image": "assets/products/web/switch-mikrotik-crs504-4xq-in.webp",
    "imageAlt": "MikroTik CRS504-4XQ-IN switch",
    "imageSource": "https://cdn.mikrotik.com/web-assets/rb_images/2156_hi_res.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://mikrotik.com/product/crs504_4xq_in",
    "sourceTitle": "MikroTik · CRS504-4XQ-IN",
    "verifiedAt": "2026-10-16",
    "badge": "100G interconnect",
    "description": "Compact switch with four 100G QSFP28 ports, 25G breakout support, and dual hot-swap power supplies for data center interconnects.",
    "scenario": "100G interconnects and 25G breakout links. Confirm the required port modes and compatible breakout cables.",
    "specs": [
      [
        "QSFP28 ports",
        "4 × 100G QSFP28"
      ],
      [
        "Port breakout",
        "Up to 16 × 25G with compatible breakout cables"
      ],
      [
        "Management port",
        "1 × 10/100 Mb/s"
      ],
      [
        "Power supplies",
        "Dual hot-swap power supplies"
      ],
      [
        "Maximum power",
        "41 W; 25 W without attachments"
      ],
      [
        "Operating system",
        "RouterOS v7"
      ],
      [
        "Dimensions (W × D × H)",
        "320 × 185 × 44 mm"
      ]
    ],
    "tags": [
      "100G",
      "QSFP28",
      "25G",
      "Data center",
      "High-speed interconnect"
    ],
    "featured": true,
    "colors": [],
    "newRank": 5,
    "provenanceNote": "Official MikroTik product image for CRS504-4XQ-IN. Copyright belongs to MikroTik.",
    "originalImage": "assets/products/switch-mikrotik-crs504-4xq-in.png"
  },
  {
    "id": "ubiquiti-usw-pro-24-poe",
    "name": "Ubiquiti USW-Pro-24-POE",
    "brand": "Ubiquiti",
    "model": "USW-Pro-24-POE",
    "category": "switch",
    "subtype": "access",
    "categoryLabel": "Switches · Enterprise access",
    "price": null,
    "image": "assets/products/web/switch-ubiquiti-usw-pro-24-poe.webp",
    "imageAlt": "Ubiquiti USW-Pro-24-POE switch",
    "imageSource": "https://cdn.ecomm.ui.com/products/5b69cdb5-e7ea-44e6-ae16-8714339038fb/18d39964-78e7-45f9-874d-e331f1408730.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://techspecs.ui.com/unifi/switching/usw-pro-24-poe",
    "sourceTitle": "UniFi Pro 24 PoE - Tech Specs",
    "verifiedAt": "2026-10-16",
    "badge": "400 W PoE access",
    "description": "24-port Gigabit PoE switch with two 10G SFP+ uplinks, Layer 3 features, and a 400 W PoE budget.",
    "scenario": "APs, cameras, and phones in UniFi networks, with 10G uplinks to the aggregation layer.",
    "specs": [
      [
        "Copper ports",
        "24 × Gigabit (16 PoE+ / 8 PoE++)"
      ],
      [
        "Uplink ports",
        "2 × 10G SFP+"
      ],
      [
        "PoE budget",
        "400 W"
      ],
      [
        "Switching capacity",
        "88 Gb/s"
      ],
      [
        "Non-blocking throughput",
        "44 Gb/s"
      ],
      [
        "Switching features",
        "Layer 3 features supported"
      ],
      [
        "Dimensions (W × D × H)",
        "442 × 285 × 44 mm"
      ]
    ],
    "tags": [
      "UniFi",
      "Gigabit",
      "PoE++",
      "24 ports",
      "400W",
      "10G uplinks"
    ],
    "featured": false,
    "colors": [],
    "newRank": 4,
    "provenanceNote": "Official Ubiquiti product image for USW-Pro-24-POE. Copyright belongs to Ubiquiti.",
    "originalImage": "assets/products/switch-ubiquiti-usw-pro-24-poe.png"
  },
  {
    "id": "ubiquiti-usw-pro-max-24-poe",
    "name": "Ubiquiti USW-Pro-Max-24-PoE",
    "brand": "Ubiquiti",
    "model": "USW-Pro-Max-24-PoE",
    "category": "switch",
    "subtype": "access",
    "categoryLabel": "Switches · Enterprise access",
    "price": null,
    "image": "assets/products/web/switch-ubiquiti-usw-pro-max-24-poe.webp",
    "imageAlt": "Ubiquiti USW-Pro-Max-24-PoE switch",
    "imageSource": "https://cdn.ecomm.ui.com/products/58922518-88f6-4c75-89c1-f57ba3d8253a/797246c6-70eb-4606-be9a-77515ac74451.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://techspecs.ui.com/unifi/switching/usw-pro-max-24-poe",
    "sourceTitle": "UniFi Pro Max 24 PoE - Tech Specs",
    "verifiedAt": "2026-10-16",
    "badge": "2.5G PoE++ access",
    "description": "24-port switch combining 16 Gigabit and eight 2.5GbE ports with PoE, 10G SFP+ uplinks, and Etherlighting indicators.",
    "scenario": "Multi-gigabit APs and enterprise endpoints. Match each powered device to the port's PoE+ or PoE++ capability.",
    "specs": [
      [
        "1GbE copper ports",
        "16 (8 PoE+ / 8 PoE++)"
      ],
      [
        "2.5GbE copper ports",
        "8 (all support PoE++)"
      ],
      [
        "Uplink ports",
        "2 × 10G SFP+"
      ],
      [
        "PoE budget",
        "400 W"
      ],
      [
        "Switching capacity",
        "112 Gb/s"
      ],
      [
        "Non-blocking throughput",
        "56 Gb/s"
      ],
      [
        "Dimensions (W × D × H)",
        "442 × 325 × 44 mm"
      ]
    ],
    "tags": [
      "UniFi",
      "2.5G",
      "PoE++",
      "24 ports",
      "400W",
      "Etherlighting"
    ],
    "featured": true,
    "colors": [],
    "newRank": 3,
    "provenanceNote": "Official Ubiquiti product image for USW-Pro-Max-24-PoE. Copyright belongs to Ubiquiti.",
    "originalImage": "assets/products/switch-ubiquiti-usw-pro-max-24-poe.png"
  },
  {
    "id": "ubiquiti-usw-pro-48",
    "name": "Ubiquiti USW-Pro-48",
    "brand": "Ubiquiti",
    "model": "USW-Pro-48",
    "category": "switch",
    "subtype": "access",
    "categoryLabel": "Switches · Enterprise access",
    "price": null,
    "image": "assets/products/web/switch-ubiquiti-usw-pro-48.webp",
    "imageAlt": "Ubiquiti USW-Pro-48 switch",
    "imageSource": "https://cdn.ecomm.ui.com/products/17a1db0a-a705-4ea0-b538-2972ca71615a/e5caa219-3faa-48a5-a4e1-d7eea81d738b.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://techspecs.ui.com/unifi/switching/usw-pro-48",
    "sourceTitle": "UniFi Pro 48 - Tech Specs",
    "verifiedAt": "2026-10-16",
    "badge": "48-port Layer 3 access",
    "description": "48-port Gigabit switch with four 10G SFP+ uplinks and Layer 3 features for high-density UniFi access networks.",
    "scenario": "High-density office access under UniFi management, with optional DC backup power.",
    "specs": [
      [
        "Copper ports",
        "48 × Gigabit RJ45"
      ],
      [
        "Uplink ports",
        "4 × 10G SFP+"
      ],
      [
        "Switching capacity",
        "176 Gb/s"
      ],
      [
        "Non-blocking throughput",
        "88 Gb/s"
      ],
      [
        "Switching features",
        "Layer 3 features supported"
      ],
      [
        "Maximum power",
        "60 W"
      ],
      [
        "Dimensions (W × D × H)",
        "442 × 285 × 44 mm"
      ]
    ],
    "tags": [
      "UniFi",
      "Gigabit",
      "48 ports",
      "Layer 3 switching",
      "SFP+",
      "10G uplinks"
    ],
    "featured": false,
    "colors": [],
    "newRank": 2,
    "provenanceNote": "Official Ubiquiti product image for USW-Pro-48. Copyright belongs to Ubiquiti.",
    "originalImage": "assets/products/switch-ubiquiti-usw-pro-48.png"
  },
  {
    "id": "ubiquiti-usw-aggregation",
    "name": "Ubiquiti USW-Aggregation",
    "brand": "Ubiquiti",
    "model": "USW-Aggregation",
    "category": "switch",
    "subtype": "aggregation",
    "categoryLabel": "Switches · Aggregation",
    "price": null,
    "image": "assets/products/web/switch-ubiquiti-usw-aggregation.webp",
    "imageAlt": "Ubiquiti USW-Aggregation switch",
    "imageSource": "https://cdn.ecomm.ui.com/products/1c748fb1-b4df-43ef-83e0-d5ed26f9db7c/b06fde87-241d-4b4e-8319-8d7d29f6f6c2.png",
    "imageNote": "Manufacturer image of this switch model.",
    "imageScope": "model",
    "sourceUrl": "https://techspecs.ui.com/unifi/switching/usw-aggregation",
    "sourceTitle": "UniFi Aggregation - Tech Specs",
    "verifiedAt": "2026-10-16",
    "badge": "8-port 10G fiber",
    "description": "Eight-port 10G SFP+ aggregation switch in a 1U chassis, with 160 Gb/s switching capacity and UniFi management.",
    "scenario": "Fiber or DAC aggregation between UniFi switches. Configure link aggregation where additional capacity or redundancy is required.",
    "specs": [
      [
        "Optical ports",
        "8 × 10G SFP+ (1G supported)"
      ],
      [
        "Switching capacity",
        "160 Gb/s"
      ],
      [
        "Non-blocking throughput",
        "80 Gb/s"
      ],
      [
        "Forwarding rate",
        "119 Mpps"
      ],
      [
        "Maximum power",
        "36 W (including SFP modules)"
      ],
      [
        "Dimensions (W × D × H)",
        "442 × 120 × 43.7 mm"
      ]
    ],
    "tags": [
      "UniFi",
      "10G",
      "8 ports",
      "SFP+",
      "Aggregation",
      "LACP"
    ],
    "featured": false,
    "colors": [],
    "newRank": 1,
    "provenanceNote": "Official Ubiquiti product image for USW-Aggregation. Copyright belongs to Ubiquiti.",
    "originalImage": "assets/products/switch-ubiquiti-usw-aggregation.png"
  }
]);
window.CL_CATEGORIES = Object.freeze({"all":"All products","server":"Servers","switch":"Switches","storage":"Server drives","accessory":"Components"});
window.CL_PRODUCT_TYPES = Object.freeze({"rack-1u":"1U rack servers","rack-2u":"2U rack servers","tower":"Tower servers","access":"Access switches","aggregation":"Aggregation switches","datacenter":"Data center switches","hdd":"Enterprise HDDs","sas-hdd":"SAS HDDs","sata-ssd":"SATA SSDs","sas-ssd":"SAS SSDs","nvme-ssd":"NVMe SSDs","nic":"Network adapters","raid":"RAID controllers","memory":"ECC server memory","transceiver":"Optical transceivers","cable":"Direct-attach cables"});
window.CL_PRODUCT_ALIASES = Object.freeze({"rack-server-2u":"dell-poweredge-r550","rack-server-1u":"dell-poweredge-r350","datacenter-switch":"mikrotik-crs504-4xq-in","access-switch":"h3c-s5130s-28p-ei"});
