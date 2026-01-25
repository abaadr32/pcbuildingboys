
// PC Component Modal Handler
document.addEventListener("DOMContentLoaded", function () {
    // Component data for all PC builds
    const componentData = {
        // Home Computer Build
        "chassis-1": { name: "Cooler Master MasterBox Q300L", brand: "Cooler Master", price: "$50.00", description: "Compact mid-tower with excellent airflow and cable management." },
        "chassis-2": { name: "Thermaltake Versa H15", brand: "Thermaltake", price: "$40.00", description: "Budget-friendly case with minimalist design." },
        "chassis-3": { name: "Corsair 110R", brand: "Corsair", price: "$45.00", description: "Clean design with tempered glass panel." },
        "chassis-4": { name: "NZXT H510 Flow", brand: "NZXT", price: "$55.00", description: "Modern case with excellent cable management." },
        "chassis-5": { name: "Lian Li Lancool 215", brand: "Lian Li", price: "$38.00", description: "Compact budget case with good airflow." },
        "chassis-6": { name: "Fractal Design Core 1000", brand: "Fractal Design", price: "$42.00", description: "Minimalist design for small builds." },
        
        "cpu-1": { name: "Intel Core i3-12100", brand: "Intel", price: "$120.00", description: "Entry-level 4-core processor for everyday tasks." },
        "cpu-2": { name: "AMD Ryzen 3 4100", brand: "AMD", price: "$100.00", description: "Budget AMD processor with good performance." },
        "cpu-3": { name: "Intel Pentium Gold G7400", brand: "Intel", price: "$70.00", description: "Affordable dual-core processor." },
        "cpu-4": { name: "AMD Athlon 3000G", brand: "AMD", price: "$65.00", description: "Budget processor with integrated graphics." },
        "cpu-5": { name: "Intel Core i5-12400", brand: "Intel", price: "$180.00", description: "Mid-range processor for general use." },
        
        "mobo-1": { name: "ASRock B660M Pro RS", brand: "ASRock", price: "$90.00", description: "Entry-level AM4 socket motherboard." },
        "mobo-2": { name: "MSI H610M PRO", brand: "MSI", price: "$85.00", description: "Compact micro-ATX motherboard." },
        "mobo-3": { name: "Gigabyte H610M S2", brand: "Gigabyte", price: "$80.00", description: "Budget micro-ATX option." },
        "mobo-4": { name: "ASUS Prime H610M-K", brand: "ASUS", price: "$88.00", description: "Reliable entry-level option." },
        "mobo-5": { name: "MSI A520M-A PRO", brand: "MSI", price: "$75.00", description: "Budget AM4 socket motherboard." },
        "mobo-6": { name: "Gigabyte B450M DS3H", brand: "Gigabyte", price: "$78.00", description: "Popular budget AM4 option." },
        
        "mem-1": { name: "Kingston 16GB DDR4", brand: "Kingston", price: "$60.00", description: "Reliable 16GB RAM module for smooth multitasking." },
        "mem-2": { name: "Corsair Vengeance 16GB DDR4", brand: "Corsair", price: "$65.00", description: "Premium 16GB RAM with excellent performance." },
        "mem-3": { name: "Crucial 16GB DDR4", brand: "Crucial", price: "$55.00", description: "Cost-effective 16GB memory module." },
        "mem-4": { name: "G.Skill Ripjaws V 16GB DDR4 3600MHz", brand: "G.Skill", price: "$62.00", description: "High-speed gaming memory." },
        "mem-5": { name: "ADATA XPG Spectrix D41 16GB DDR4", brand: "ADATA", price: "$68.00", description: "Stylish high-performance RAM with RGB." },
        "mem-6": { name: "Team Vulcan 16GB DDR4", brand: "Team", price: "$50.00", description: "Budget-friendly 16GB option." },
        
        "gpu-1": { name: "Integrated Intel UHD 730", brand: "Intel", price: "Free (Integrated)", description: "Built-in graphics suitable for everyday use." },
        "gpu-2": { name: "Integrated AMD Vega 8", brand: "AMD", price: "Free (Integrated)", description: "AMD's integrated graphics solution." },
        "gpu-3": { name: "NVIDIA GT 1030 2GB", brand: "NVIDIA", price: "$90.00", description: "Entry-level discrete GPU for light gaming." },
        "gpu-4": { name: "AMD Radeon RX 6500 XT 4GB", brand: "AMD", price: "$120.00", description: "Budget discrete GPU option." },
        "gpu-5": { name: "Intel Arc A380", brand: "Intel", price: "$100.00", description: "Intel's entry-level discrete graphics." },
        "gpu-6": { name: "NVIDIA GTX 1650", brand: "NVIDIA", price: "$110.00", description: "Low-power discrete GPU." },
        
        "storage-1": { name: "Kingston A2000 500GB NVMe SSD", brand: "Kingston", price: "$40.00", description: "Fast NVMe SSD for quick boot times." },
        "storage-2": { name: "WD Green 480GB SSD", brand: "WD", price: "$45.00", description: "Reliable SATA SSD storage solution." },
        "storage-3": { name: "Crucial P2 500GB NVMe SSD", brand: "Crucial", price: "$42.00", description: "Affordable NVMe storage option." },
        "storage-4": { name: "Samsung 870 EVO 500GB SATA", brand: "Samsung", price: "$48.00", description: "Popular SATA SSD from trusted brand." },
        "storage-5": { name: "WD Blue SN570 500GB NVMe", brand: "WD", price: "$38.00", description: "Budget NVMe option from WD." },
        "storage-6": { name: "Seagate Barracuda 1TB HDD", brand: "Seagate", price: "$45.00", description: "Traditional hard drive for bulk storage." },
        
        "psu-1": { name: "EVGA 500 W1, 80+", brand: "EVGA", price: "$50.00", description: "Reliable 500W power supply unit." },
        "psu-2": { name: "Corsair VS450 450W", brand: "Corsair", price: "$45.00", description: "Efficient 450W PSU for budget builds." },
        "psu-3": { name: "Thermaltake Smart 500W", brand: "Thermaltake", price: "$48.00", description: "Well-rounded 500W power solution." },
        "psu-4": { name: "MSI A550GF 550W", brand: "MSI", price: "$55.00", description: "Reliable 550W budget option." },
        "psu-5": { name: "Corsair CV550 550W", brand: "Corsair", price: "$50.00", description: "Efficient 550W PSU." },
        "psu-6": { name: "EVGA BR 500W, 80 Bronze", brand: "EVGA", price: "$48.00", description: "Basic 500W power supply." },
        
        "cooling-1": { name: "Stock CPU Cooler", brand: "Intel/AMD", price: "Free (Included)", description: "Standard cooler included with processor." },
        "cooling-2": { name: "Cooler Master Hyper 212 Black Edition", brand: "Cooler Master", price: "$35.00", description: "Popular budget air cooler with great performance." },
        "cooling-3": { name: "Thermaltake UX100 ARGB", brand: "Thermaltake", price: "$25.00", description: "Compact RGB cooler for tight spaces." },
        "cooling-4": { name: "be quiet! Pure Rock Slim", brand: "be quiet!", price: "$30.00", description: "Quiet air cooler with good performance." },
        "cooling-5": { name: "Arctic Freezer 7 X", brand: "Arctic", price: "$20.00", description: "Budget-friendly air cooler." },
        "cooling-6": { name: "Noctua NH-U9S", brand: "Noctua", price: "$55.00", description: "Premium compact air cooler." },
        
        // Professional Use Computer
        "professional-chassis-1": { name: "Corsair 4000D Airflow", brand: "Corsair", price: "$90.00", description: "Premium case with excellent airflow for workstations." },
        "professional-chassis-2": { name: "Fractal Design Meshify C", brand: "Fractal Design", price: "$110.00", description: "High-end case with mesh front panel." },
        "professional-chassis-3": { name: "Lian Li Lancool 215 Mesh", brand: "Lian Li", price: "$55.00", description: "Compact mesh case for professional builds." },
        "professional-chassis-4": { name: "NZXT H710i", brand: "NZXT", price: "$170.00", description: "Premium case with smart cooling features." },
        "professional-chassis-5": { name: "be quiet! Pure Base 500", brand: "be quiet!", price: "$95.00", description: "Silent-optimized workstation case." },
        "professional-chassis-6": { name: "Corsair 5000T", brand: "Corsair", price: "$200.00", description: "Ultra-premium airflow case." },
        
        "cpu-1": { name: "Intel Core i7-12700K", brand: "Intel", price: "$350.00", description: "High-performance 12-core processor for professional work." },
        "cpu-2": { name: "AMD Ryzen 7 5800X", brand: "AMD", price: "$330.00", description: "8-core processor with excellent multi-threading." },
        "cpu-3": { name: "Intel Core i7-13700K", brand: "Intel", price: "$410.00", description: "Latest gen high-performance processor." },
        "cpu-4": { name: "AMD Ryzen 7 7700X", brand: "AMD", price: "$370.00", description: "Latest gen AM5 socket processor." },
        "cpu-5": { name: "Intel Xeon W5-2445X", brand: "Intel", price: "$550.00", description: "Server-class processor for extreme workloads." },
        
        "mobo-1": { name: "ASUS TUF Gaming Z690", brand: "ASUS", price: "$250.00", description: "High-end Z690 motherboard for enthusiasts." },
        "mobo-2": { name: "MSI MPG Z690 Edge", brand: "MSI", price: "$270.00", description: "Premium gaming/workstation motherboard." },
        "mobo-3": { name: "Gigabyte Z690 Master", brand: "Gigabyte", price: "$260.00", description: "Solid Z690 option with excellent features." },
        "mobo-4": { name: "ASUS ProArt Z790-Creator", brand: "ASUS", price: "$450.00", description: "Professional-grade Z790 motherboard." },
        "mobo-5": { name: "MSI MAG Z790 ACE", brand: "MSI", price: "$380.00", description: "High-end Z790 workstation board." },
        "mobo-6": { name: "ASRock Z790 PG Riptide", brand: "ASRock", price: "$280.00", description: "Gaming/professional Z790 board." },
        
        "mem-1": { name: "Corsair Vengeance 32GB DDR4", brand: "Corsair", price: "$120.00", description: "32GB kit for heavy workloads and streaming." },
        "mem-2": { name: "G.Skill Trident Z 32GB DDR4", brand: "G.Skill", price: "$130.00", description: "High-performance 32GB RAM kit." },
        "mem-3": { name: "Kingston Fury Beast 32GB DDR5", brand: "Kingston", price: "$150.00", description: "High-speed DDR5 32GB kit." },
        "mem-4": { name: "Corsair Vengeance 64GB DDR4", brand: "Corsair", price: "$220.00", description: "64GB kit for extreme workloads." },
        "mem-5": { name: "G.Skill Trident Z5 32GB DDR5 6000MHz", brand: "G.Skill", price: "$180.00", description: "Extreme DDR5 performance memory." },
        "mem-6": { name: "Team Xtreem ARGB 32GB DDR4", brand: "Team", price: "$100.00", description: "Budget 32GB RAM kit." },
        
        "gpu-1": { name: "NVIDIA RTX 3070", brand: "NVIDIA", price: "$500.00", description: "Mid-range GPU perfect for professional work." },
        "gpu-2": { name: "AMD Radeon RX 6800", brand: "AMD", price: "$480.00", description: "Powerful workstation GPU." },
        "gpu-3": { name: "NVIDIA RTX 4070", brand: "NVIDIA", price: "$600.00", description: "Latest gen professional GPU." },
        "gpu-4": { name: "AMD Radeon RX 7800 XT", brand: "AMD", price: "$450.00", description: "High-end RDNA3 workstation GPU." },
        "gpu-5": { name: "NVIDIA RTX A4500", brand: "NVIDIA", price: "$2500.00", description: "Professional RTX workstation GPU." },
        "gpu-6": { name: "AMD Radeon Pro W6800", brand: "AMD", price: "$2000.00", description: "AMD's professional workstation GPU." },
        
        "storage-1": { name: "Samsung 980 Pro 1TB NVMe", brand: "Samsung", price: "$100.00", description: "Ultra-fast PCIe 4.0 NVMe storage." },
        "storage-2": { name: "Corsair MP600 1TB", brand: "Corsair", price: "$95.00", description: "Premium PCIe 4.0 NVMe drive." },
        "storage-3": { name: "WD Black SN850X 1TB", brand: "WD", price: "$90.00", description: "Fast PCIe 4.0 workstation storage." },
        "storage-4": { name: "Seagate FireCuda 530 2TB", brand: "Seagate", price: "$160.00", description: "2TB PCIe 4.0 professional storage." },
        "storage-5": { name: "Kingston A3000 2TB NVMe", brand: "Kingston", price: "$130.00", description: "Reliable 2TB NVMe for professionals." },
        "storage-6": { name: "Samsung 870 QVO 4TB SSD", brand: "Samsung", price: "$280.00", description: "Bulk SATA SSD for archives." },
        
        "psu-1": { name: "Corsair RM850x 850W 80+ Gold", brand: "Corsair", price: "$130.00", description: "Reliable 850W gold-rated PSU." },
        "psu-2": { name: "EVGA SuperNOVA 850 G+ 80+ Gold", brand: "EVGA", price: "$125.00", description: "Efficient 850W power supply." },
        "psu-3": { name: "Seasonic Focus GX-1000 1000W", brand: "Seasonic", price: "$160.00", description: "Premium 1000W gold-rated PSU." },
        "psu-4": { name: "Corsair HX1000i Platinum", brand: "Corsair", price: "$240.00", description: "Ultra-premium 1000W modular PSU." },
        "psu-5": { name: "Thermaltake Toughpower 850W", brand: "Thermaltake", price: "$110.00", description: "Budget-friendly 850W option." },
        "psu-6": { name: "MSI MAG A750GL 750W", brand: "MSI", price: "$100.00", description: "Efficient 750W workstation PSU." },
        
        "cooling-1": { name: "Noctua NH-D15", brand: "Noctua", price: "$95.00", description: "Premium dual-tower air cooler." },
        "cooling-2": { name: "Corsair H150i Elite Capellix", brand: "Corsair", price: "$165.00", description: "High-performance 360mm AIO cooler." },
        "cooling-3": { name: "NZXT Kraken Z73", brand: "NZXT", price: "$200.00", description: "360mm AIO with LCD screen." },
        "cooling-4": { name: "Arctic Liquid Freezer II 280", brand: "Arctic", price: "$100.00", description: "Efficient 280mm AIO cooler." },
        "cooling-5": { name: "Thermalright Peerless Assassin", brand: "Thermalright", price: "$35.00", description: "Budget high-performance air cooler." },
        "cooling-6": { name: "Corsair H115i Pro RGB", brand: "Corsair", price: "$120.00", description: "Premium 280mm AIO cooler." },
        
        // School Computer
        "school-chassis-1": { name: "Cooler Master MasterBox Q300L", brand: "Cooler Master", price: "$40.00", description: "Budget-friendly compact case." },
        "school-chassis-2": { name: "Thermaltake Versa H15", brand: "Thermaltake", price: "$35.00", description: "Affordable case for students." },
        "school-chassis-3": { name: "Corsair 110R", brand: "Corsair", price: "$38.00", description: "Clean design at budget price." },
        "school-chassis-4": { name: "NZXT H510 Flow", brand: "NZXT", price: "$45.00", description: "Modern budget case." },
        "school-chassis-5": { name: "Lian Li Lancool 215", brand: "Lian Li", price: "$32.00", description: "Compact ultra-budget option." },
        "school-chassis-6": { name: "Fractal Design Core 1000", brand: "Fractal Design", price: "$36.00", description: "Minimalist student build." },
        
        "cpu-1": { name: "Intel Pentium Gold G7400", brand: "Intel", price: "$70.00", description: "Budget processor for basic tasks." },
        "cpu-2": { name: "AMD Athlon 3000G", brand: "AMD", price: "$55.00", description: "Affordable processor with integrated graphics." },
        "cpu-3": { name: "Intel Core i3-12100", brand: "Intel", price: "$110.00", description: "Entry-level 4-core for light multitasking." },
        "cpu-4": { name: "AMD Ryzen 3 5100", brand: "AMD", price: "$95.00", description: "Budget 4-core Ryzen processor." },
        "cpu-5": { name: "Intel Celeron G6900", brand: "Intel", price: "$50.00", description: "Ultra-budget 2-core processor." },
        
        "mobo-1": { name: "ASRock A320M-HDV R4.0", brand: "ASRock", price: "$70.00", description: "Basic AM4 socket motherboard." },
        "mobo-2": { name: "Gigabyte B450M DS3H", brand: "Gigabyte", price: "$75.00", description: "Budget micro-ATX option." },
        "mobo-3": { name: "MSI A520M-A PRO", brand: "MSI", price: "$72.00", description: "Budget AM4 option." },
        "mobo-4": { name: "ASRock H610M-ITX/tb", brand: "ASRock", price: "$85.00", description: "Mini-ITX budget board." },
        "mobo-5": { name: "Gigabyte H610M H", brand: "Gigabyte", price: "$80.00", description: "Basic H610 option." },
        "mobo-6": { name: "ASUS Prime A520M-K", brand: "ASUS", price: "$68.00", description: "Ultra-budget AM4 board." },
        
        "mem-1": { name: "Kingston 8GB DDR4", brand: "Kingston", price: "$35.00", description: "8GB RAM for basic multitasking." },
        "mem-2": { name: "Corsair Vengeance 8GB DDR4", brand: "Corsair", price: "$38.00", description: "Reliable 8GB memory module." },
        "mem-3": { name: "Crucial 8GB DDR4", brand: "Crucial", price: "$30.00", description: "Budget 8GB RAM option." },
        "mem-4": { name: "Team Vulcan 8GB DDR4", brand: "Team", price: "$28.00", description: "Ultra-budget 8GB memory." },
        "mem-5": { name: "G.Skill Ripjaws V 16GB DDR4", brand: "G.Skill", price: "$55.00", description: "16GB kit for better multitasking." },
        "mem-6": { name: "ADATA XPG 8GB DDR4", brand: "ADATA", price: "$32.00", description: "Budget gaming-focused 8GB." },
        
        "gpu-1": { name: "Integrated Intel UHD 710", brand: "Intel", price: "Free (Integrated)", description: "Built-in graphics." },
        "gpu-2": { name: "NVIDIA GT 1030 2GB", brand: "NVIDIA", price: "$90.00", description: "Basic discrete GPU." },
        "gpu-3": { name: "AMD Radeon RX 5500 XT 4GB", brand: "AMD", price: "$110.00", description: "Budget discrete GPU." },
        "gpu-4": { name: "Intel Arc A380", brand: "Intel", price: "$95.00", description: "Intel entry-level discrete GPU." },
        "gpu-5": { name: "NVIDIA GTX 1050 2GB", brand: "NVIDIA", price: "$85.00", description: "Used but reliable GPU." },
        "gpu-6": { name: "AMD Radeon RX 6500 XT", brand: "AMD", price: "$115.00", description: "Budget new discrete GPU." },
        
        "storage-1": { name: "Kingston A2000 500GB NVMe SSD", brand: "Kingston", price: "$35.00", description: "Affordable NVMe for students." },
        "storage-2": { name: "WD Green 480GB SSD", brand: "WD", price: "$40.00", description: "Budget SATA SSD option." },
        "storage-3": { name: "Crucial P2 500GB NVMe SSD", brand: "Crucial", price: "$38.00", description: "Good value NVMe." },
        "storage-4": { name: "Team L5 Lite 3D 480GB", brand: "Team", price: "$32.00", description: "Ultra-budget SATA SSD." },
        "storage-5": { name: "Seagate Barracuda 1TB HDD", brand: "Seagate", price: "$40.00", description: "Budget bulk storage." },
        "storage-6": { name: "WD Blue 1TB HDD", brand: "WD", price: "$42.00", description: "Reliable 1TB hard drive." },
        
        "psu-1": { name: "EVGA 500 W1, 80+", brand: "EVGA", price: "$45.00", description: "Reliable 500W budget PSU." },
        "psu-2": { name: "Corsair VS450 450W", brand: "Corsair", price: "$40.00", description: "Efficient 450W budget option." },
        "psu-3": { name: "Thermaltake Smart 500W", brand: "Thermaltake", price: "$43.00", description: "Basic 500W power supply." },
        "psu-4": { name: "MSI A550GF 550W", brand: "MSI", price: "$50.00", description: "Reliable 550W budget option." },
        "psu-5": { name: "Corsair CV450", brand: "Corsair", price: "$42.00", description: "Budget 450W PSU." },
        "psu-6": { name: "EVGA 600 B1, 80 Bronze", brand: "EVGA", price: "$45.00", description: "Basic 600W power supply." },
        
        "cooling-1": { name: "Stock CPU Cooler", brand: "Intel/AMD", price: "Free (Included)", description: "Included with processor." },
        "cooling-2": { name: "Cooler Master Hyper 212 Black Edition", brand: "Cooler Master", price: "$32.00", description: "Popular budget cooler." },
        "cooling-3": { name: "Thermaltake UX100 ARGB", brand: "Thermaltake", price: "$22.00", description: "Budget RGB cooler." },
        "cooling-4": { name: "Arctic Freezer 7 X", brand: "Arctic", price: "$18.00", description: "Ultra-budget air cooler." },
        "cooling-5": { name: "be quiet! Pure Rock Slim", brand: "be quiet!", price: "$28.00", description: "Quiet budget cooler." },
        "cooling-6": { name: "Noctua NH-U9S", brand: "Noctua", price: "$52.00", description: "Premium budget cooler." },
        
        // Mid-Tier Gaming - all categories
        "gaming-chassis-1": { name: "NZXT H510", brand: "NZXT", price: "$75.00", description: "Popular gaming case with clean design." },
        "gaming-chassis-2": { name: "Corsair 4000D Airflow", brand: "Corsair", price: "$90.00", description: "Excellent airflow for gaming setups." },
        "gaming-chassis-3": { name: "Fractal Design Meshify C", brand: "Fractal Design", price: "$105.00", description: "High-end gaming case." },
        "gaming-chassis-4": { name: "Lian Li Lancool 215 Mesh", brand: "Lian Li", price: "$60.00", description: "Gaming mesh case." },
        "gaming-chassis-5": { name: "be quiet! Pure Base 500", brand: "be quiet!", price: "$85.00", description: "Silent gaming case." },
        "gaming-chassis-6": { name: "Corsair 5000T RGB", brand: "Corsair", price: "$180.00", description: "Premium RGB gaming case." },
        
        "cpu-1": { name: "Intel Core i5-12600K", brand: "Intel", price: "$280.00", description: "Great gaming processor with 10 cores." },
        "cpu-2": { name: "AMD Ryzen 5 5600X", brand: "AMD", price: "$250.00", description: "Popular gaming CPU with strong performance." },
        "cpu-3": { name: "Intel Core i5-13600K", brand: "Intel", price: "$320.00", description: "Latest gen gaming CPU." },
        "cpu-4": { name: "AMD Ryzen 5 7600X", brand: "AMD", price: "$280.00", description: "Latest Ryzen gaming CPU." },
        "cpu-5": { name: "Intel Core i7-13700K", brand: "Intel", price: "$410.00", description: "High-end gaming processor." },
        
        "mobo-1": { name: "MSI B660 Tomahawk WiFi DDR4", brand: "MSI", price: "$180.00", description: "Gaming motherboard with WiFi." },
        "mobo-2": { name: "ASUS TUF Gaming B660-PLUS WIFI", brand: "ASUS", price: "$190.00", description: "Durable gaming motherboard." },
        "mobo-3": { name: "Gigabyte B660 Gaming X DDR4", brand: "Gigabyte", price: "$175.00", description: "Gaming-focused B660 board." },
        "mobo-4": { name: "MSI MPG B760 EDGE WIFI", brand: "MSI", price: "$220.00", description: "Premium B760 gaming board." },
        "mobo-5": { name: "ASUS ROG Strix B760-F Gaming WIFI", brand: "ASUS", price: "$240.00", description: "High-end gaming motherboard." },
        "mobo-6": { name: "ASRock B760M Pro RS", brand: "ASRock", price: "$140.00", description: "Budget B760 option." },
        
        "mem-1": { name: "Corsair Vengeance LPX 16GB DDR4 3200MHz", brand: "Corsair", price: "$70.00", description: "Gaming-optimized 16GB RAM." },
        "mem-2": { name: "G.Skill Ripjaws V 16GB DDR4 3600MHz", brand: "G.Skill", price: "$75.00", description: "High-speed gaming memory." },
        "mem-3": { name: "Kingston Fury Beast 32GB DDR4 3200MHz", brand: "Kingston", price: "$100.00", description: "Gaming 32GB kit." },
        "mem-4": { name: "Corsair Dominator Platinum RGB 16GB", brand: "Corsair", price: "$95.00", description: "Premium RGB gaming RAM." },
        "mem-5": { name: "G.Skill Trident Z Royal 16GB", brand: "G.Skill", price: "$85.00", description: "Stylish gaming memory." },
        "mem-6": { name: "Team T-Force Delta RGB 16GB", brand: "Team", price: "$65.00", description: "Budget gaming RAM." },
        
        "gpu-1": { name: "NVIDIA RTX 3060 12GB", brand: "NVIDIA", price: "$350.00", description: "Excellent 1440p gaming GPU." },
        "gpu-2": { name: "AMD Radeon RX 6600 XT 8GB", brand: "AMD", price: "$380.00", description: "Strong AMD gaming alternative." },
        "gpu-3": { name: "NVIDIA RTX 4070", brand: "NVIDIA", price: "$600.00", description: "High-end 4K gaming GPU." },
        "gpu-4": { name: "AMD Radeon RX 7800 XT", brand: "AMD", price: "$450.00", description: "Strong 1440p/4K gaming GPU." },
        "gpu-5": { name: "NVIDIA RTX 4060 Ti 8GB", brand: "NVIDIA", price: "$500.00", description: "Mid-range 1440p gaming GPU." },
        "gpu-6": { name: "AMD Radeon RX 6700 XT", brand: "AMD", price: "$320.00", description: "Good value 1440p GPU." },
        
        "storage-1": { name: "Samsung 980 Pro 1TB NVMe", brand: "Samsung", price: "$95.00", description: "Ultra-fast gaming NVMe." },
        "storage-2": { name: "Corsair MP600 1TB", brand: "Corsair", price: "$90.00", description: "Premium PCIe 4.0 gaming drive." },
        "storage-3": { name: "WD Black SN850X 1TB", brand: "WD", price: "$88.00", description: "Fast gaming SSD." },
        "storage-4": { name: "Seagate FireCuda 530 1TB", brand: "Seagate", price: "$75.00", description: "Gaming-optimized NVMe." },
        "storage-5": { name: "Kingston A3000 1TB NVMe", brand: "Kingston", price: "$65.00", description: "Budget NVMe option." },
        "storage-6": { name: "Samsung 870 QVO 2TB SATA", brand: "Samsung", price: "$120.00", description: "Large capacity game storage." },
        
        "psu-1": { name: "Corsair RM750 750W 80+ Gold", brand: "Corsair", price: "$120.00", description: "Reliable 750W gold-rated PSU." },
        "psu-2": { name: "Seasonic Focus GX-650 80+ Gold", brand: "Seasonic", price: "$110.00", description: "Efficient 650W gaming PSU." },
        "psu-3": { name: "EVGA SuperNOVA 850 G+ 80+ Gold", brand: "EVGA", price: "$125.00", description: "Premium 850W gaming PSU." },
        "psu-4": { name: "Corsair HX850i Platinum", brand: "Corsair", price: "$180.00", description: "Ultra-premium modular PSU." },
        "psu-5": { name: "Thermaltake Toughpower 750W Gold", brand: "Thermaltake", price: "$95.00", description: "Budget gaming PSU." },
        "psu-6": { name: "MSI MPG A1000G 1000W", brand: "MSI", price: "$150.00", description: "High-power gaming PSU." },
        
        "cooling-1": { name: "Cooler Master Hyper 212 Black Edition", brand: "Cooler Master", price: "$35.00", description: "Popular gaming air cooler." },
        "cooling-2": { name: "Corsair H100i RGB Pro XT", brand: "Corsair", price: "$110.00", description: "High-performance liquid cooler." },
        "cooling-3": { name: "NZXT Kraken X63", brand: "NZXT", price: "$130.00", description: "Popular RGB AIO cooler." },
        "cooling-4": { name: "Arctic Liquid Freezer II 280", brand: "Arctic", price: "$95.00", description: "Efficient gaming AIO." },
        "cooling-5": { name: "Thermalright Peerless Assassin 120", brand: "Thermalright", price: "$35.00", description: "Budget high-performance air cooler." },
        "cooling-6": { name: "Corsair iCUE H150i Elite LCD", brand: "Corsair", price: "$200.00", description: "Premium LCD AIO cooler." },
        
        // Architecture Rendering Workstation - all categories
        "rendering-chassis-1": { name: "Fractal Design Meshify 2", brand: "Fractal Design", price: "$150.00", description: "Premium workstation case with excellent cooling." },
        "rendering-chassis-2": { name: "Lian Li PC-O11 Dynamic", brand: "Lian Li", price: "$160.00", description: "High-end case for dual-loop systems." },
        "rendering-chassis-3": { name: "Corsair 5000T RGB", brand: "Corsair", price: "$200.00", description: "Premium dual-chamber case." },
        "rendering-chassis-4": { name: "NZXT H710i", brand: "NZXT", price: "$170.00", description: "Smart cooling workstation case." },
        "rendering-chassis-5": { name: "Phanteks Enthoo Luxe 2", brand: "Phanteks", price: "$180.00", description: "High-end rendering case." },
        "rendering-chassis-6": { name: "Corsair Obsidian 1000D", brand: "Corsair", price: "$220.00", description: "Extreme workstation case." },
        
        "cpu-1": { name: "AMD Ryzen 9 7950X", brand: "AMD", price: "$580.00", description: "16-core processor for extreme rendering." },
        "cpu-2": { name: "Intel Core i9-13900K", brand: "Intel", price: "$600.00", description: "High-end Intel processor for workstations." },
        "cpu-3": { name: "AMD Threadripper 3960X", brand: "AMD", price: "$900.00", description: "64-core monster for professional rendering." },
        "cpu-4": { name: "AMD Ryzen 9 9950X", brand: "AMD", price: "$700.00", description: "Latest gen 16-core Zen5 processor." },
        "cpu-5": { name: "Intel Xeon W5-3425", brand: "Intel", price: "$1200.00", description: "Professional workstation Xeon." },
        
        "mobo-1": { name: "ASUS ProArt X670E-Creator", brand: "ASUS", price: "$500.00", description: "Professional-grade X670E motherboard." },
        "mobo-2": { name: "MSI MEG X670E ACE", brand: "MSI", price: "$480.00", description: "High-end enthusiast motherboard." },
        "mobo-3": { name: "Gigabyte X870-E Master", brand: "Gigabyte", price: "$550.00", description: "Latest gen X870E board." },
        "mobo-4": { name: "ASUS WS X870-E SAGE", brand: "ASUS", price: "$700.00", description: "Professional workstation X870E." },
        "mobo-5": { name: "Supermicro H13SSL-TNHRC", brand: "Supermicro", price: "$1000.00", description: "Server-class dual-socket board." },
        "mobo-6": { name: "ASRock TRX50E-SAGE", brand: "ASRock", price: "$800.00", description: "Threadripper professional board." },
        
        "mem-1": { name: "Corsair Vengeance 64GB DDR5", brand: "Corsair", price: "$260.00", description: "64GB DDR5 for heavy rendering workloads." },
        "mem-2": { name: "G.Skill Trident Z5 64GB", brand: "G.Skill", price: "$250.00", description: "High-performance 64GB DDR5." },
        "mem-3": { name: "Kingston Fury Beast 96GB DDR5", brand: "Kingston", price: "$380.00", description: "96GB DDR5 extreme kit." },
        "mem-4": { name: "Corsair Vengeance 128GB DDR5", brand: "Corsair", price: "$480.00", description: "Ultra-high capacity 128GB DDR5." },
        "mem-5": { name: "Crucial Pro 64GB DDR5", brand: "Crucial", price: "$220.00", description: "Budget 64GB DDR5 option." },
        "mem-6": { name: "Samsung M425R08GB3R-CQK", brand: "Samsung", price: "$1200.00", description: "Server-class 64GB DDR5 per stick." },
        
        "gpu-1": { name: "NVIDIA RTX 4090", brand: "NVIDIA", price: "$1600.00", description: "Ultimate rendering GPU with 24GB VRAM." },
        "gpu-2": { name: "NVIDIA RTX 4080 Super", brand: "NVIDIA", price: "$1200.00", description: "Professional rendering powerhouse." },
        "gpu-3": { name: "NVIDIA RTX A5000", brand: "NVIDIA", price: "$1800.00", description: "NVIDIA's professional rendering solution." },
        "gpu-4": { name: "AMD Radeon Pro W6900X", brand: "AMD", price: "$6800.00", description: "Dual-GPU professional rendering card." },
        "gpu-5": { name: "NVIDIA L40S 48GB", brand: "NVIDIA", price: "$8000.00", description: "Data center rendering GPU." },
        "gpu-6": { name: "NVIDIA RTX 6000 Ada", brand: "NVIDIA", price: "$7000.00", description: "Professional Ada architecture GPU." },
        
        "storage-1": { name: "Samsung 990 Pro 4TB NVMe", brand: "Samsung", price: "$320.00", description: "Ultra-fast 4TB rendering storage." },
        "storage-2": { name: "Corsair MP600 GEN5 RAID 8TB", brand: "Corsair", price: "$600.00", description: "RAID-optimized ultra-fast storage." },
        "storage-3": { name: "WD Black SN850X 4TB", brand: "WD", price: "$280.00", description: "4TB PCIe 4.0 professional storage." },
        "storage-4": { name: "Seagate FireCuda 530 8TB", brand: "Seagate", price: "$500.00", description: "8TB PCIe 4.0 rendering drive." },
        "storage-5": { name: "Samsung 870 QVO 8TB SATA", brand: "Samsung", price: "$450.00", description: "8TB bulk project archive storage." },
        "storage-6": { name: "Seagate Barracuda Pro 18TB HDD", brand: "Seagate", price: "$350.00", description: "18TB cold storage for archives." },
        
        "psu-1": { name: "Corsair HX1200i Platinum", brand: "Corsair", price: "$270.00", description: "Premium 1200W modular PSU." },
        "psu-2": { name: "Seasonic Prime TX-1300", brand: "Seasonic", price: "$250.00", description: "Efficient 1300W Titanium PSU." },
        "psu-3": { name: "EVGA SuperNOVA 1600 G+", brand: "EVGA", price: "$280.00", description: "High-power 1600W PSU for dual-GPU." },
        "psu-4": { name: "Corsair AX1600i Titanium", brand: "Corsair", price: "$350.00", description: "Ultra-premium 1600W PSU." },
        "psu-5": { name: "Thermaltake Toughpower GF1 1050W", brand: "Thermaltake", price: "$150.00", description: "Budget 1050W option." },
        "psu-6": { name: "MSI MPG A1600G Platinum", brand: "MSI", price: "$280.00", description: "Gaming/workstation 1600W PSU." },
        
        "cooling-1": { name: "Corsair H150i Elite LCD", brand: "Corsair", price: "$200.00", description: "Premium 360mm AIO with LCD." },
        "cooling-2": { name: "NZXT Kraken Z90 RGB", brand: "NZXT", price: "$250.00", description: "Extreme 360mm AIO cooler." },
        "cooling-3": { name: "Arctic Liquid Freezer II 420", brand: "Arctic", price: "$130.00", description: "Efficient 420mm AIO cooler." },
        "cooling-4": { name: "Corsair iCUE H170i Elite LCD", brand: "Corsair", price: "$280.00", description: "Ultra-premium 420mm LCD cooler." },
        "cooling-5": { name: "EK-AIO 360 Elite", brand: "EK", price: "$220.00", description: "Professional custom-loop ready cooler." },
        "cooling-6": { name: "Swiftech H320 X20", brand: "Swiftech", price: "$300.00", description: "Custom loop modular cooler." }
    };

    function openComponentModal(componentId) {
        const component = componentData[componentId];
        if (component) {
            document.getElementById("modalTitle").textContent = component.name;
            document.getElementById("modalDescription").innerHTML = `<strong>Brand:</strong> ${component.brand}<br><br>${component.description}`;
            document.getElementById("modalPrice").textContent = component.price;
            
            // Set the modal image to logo.jpg
            const modalImageSource = document.getElementById("modalImageSource");
            const modalImage = document.getElementById("modalImage");
            if (modalImageSource && modalImage) {
                modalImageSource.srcset = "logo.jpg";
                modalImage.src = "logo.jpg";
                modalImage.alt = component.name;
            }

            const productModal = new bootstrap.Modal(document.getElementById("productModal"));
            productModal.show();
        }
    }

    // Attach event listener to all component cards
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function (e) {
            const componentId = this.getAttribute("data-id");
            if (componentId && !componentId.match(/^\d+$/)) {
                e.stopPropagation();
                openComponentModal(componentId);
            }
        });
    });
});
