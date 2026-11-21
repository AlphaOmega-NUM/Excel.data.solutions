export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  supportingDetails: string;
  features: string[];
  image: string;
  imageAlt: string;
  /**
   * Replace each placeholder below with the live Google Sheets share URL
   * (e.g., "https://docs.google.com/spreadsheets/d/...").
   */
  projectUrl: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "data-cleaning",
    title: "Data Cleaning & Quality Assurance",
    category: "Data Cleaning",
    description:
      "A structured data cleaning workflow designed to transform raw, inconsistent records into a more organized and reliable dataset.",
    supportingDetails:
      "This project demonstrates data standardization, error identification, cleaning documentation and quality checks to improve data consistency and usability.",
    features: [
      "Raw and cleaned data comparison",
      "Data standardization",
      "Cleaning audit log",
      "Quality assurance checks",
    ],
    image: "/src/assets/images/portfolio_data_cleaning_1795256348412.jpg",
    imageAlt:
      "Demonstration preview showing uncategorized raw records transformed into a standardized financial tracking sheet",
    projectUrl: "REPLACE_WITH_DATA_CLEANING_GOOGLE_SHEETS_URL",
  },
  {
    id: "spreadsheet-organization",
    title: "Spreadsheet Organization",
    category: "Spreadsheet Organization",
    description:
      "A spreadsheet organization project focused on improving the structure, readability and usability of business data.",
    supportingDetails:
      "The workbook demonstrates how properly arranged records, consistent formatting and structured tables can make spreadsheet information easier to manage and navigate.",
    features: [
      "Structured data tables",
      "Consistent formatting",
      "Improved spreadsheet layout",
      "Organized data records",
    ],
    image: "/src/assets/images/portfolio_spreadsheet_org_1795256348481.jpg",
    imageAlt:
      "Minimalist structured spreadsheet tables with organized forest green and sage header hierarchy",
    projectUrl: "REPLACE_WITH_SPREADSHEET_ORGANIZATION_GOOGLE_SHEETS_URL",
  },
  {
    id: "sales-dashboard",
    title: "Sales Performance Dashboard",
    category: "Reporting & Dashboard",
    description:
      "A visual sales reporting dashboard designed to summarize sales information and provide a clearer overview of business performance.",
    supportingDetails:
      "This project transforms organized sales records into visual insights through charts, performance summaries and key metrics, helping users explore their sales data more efficiently.",
    features: [
      "Sales performance overview",
      "KPI summaries",
      "Visual charts",
      "Structured sales reporting",
    ],
    image: "/src/assets/images/portfolio_sales_dashboard_1795256348402.jpg",
    imageAlt:
      "Sales performance dashboard demonstration with KPI summaries, bar charts, trend line, and regional table",
    projectUrl: "REPLACE_WITH_SALES_DASHBOARD_GOOGLE_SHEETS_URL",
  },
  {
    id: "inventory",
    title: "Inventory Management System",
    category: "Spreadsheet Management",
    description:
      "A structured inventory tracking spreadsheet designed to organize product records and monitor stock information.",
    supportingDetails:
      "The workbook demonstrates a practical approach to inventory organization, stock monitoring and inventory reporting through a clear and manageable spreadsheet structure.",
    features: [
      "Product inventory records",
      "Stock monitoring",
      "Organized inventory tables",
      "Inventory summaries",
    ],
    image: "/src/assets/images/portfolio_inventory_system_1795256348346.jpg",
    imageAlt:
      "Inventory management spreadsheet demonstration tracking SKUs, stock levels, reorder thresholds, and stock values",
    projectUrl: "REPLACE_WITH_INVENTORY_GOOGLE_SHEETS_URL",
  },
  {
    id: "business-reporting",
    title: "Business Reporting & Analysis",
    category: "Business Reporting",
    description:
      "A business reporting spreadsheet designed to present structured information in a clear and accessible format.",
    supportingDetails:
      "This project focuses on organizing data into meaningful summaries, combining tables and visual elements to make information easier to review and interpret.",
    features: [
      "Summary tables",
      "Business reporting layout",
      "Data visualization",
      "Organized information presentation",
    ],
    image: "/src/assets/images/portfolio_business_reporting_1795256348497.jpg",
    imageAlt:
      "Executive business reporting layout combining structured performance tables with regional comparison and variance charts",
    projectUrl: "REPLACE_WITH_BUSINESS_REPORTING_GOOGLE_SHEETS_URL",
  },
  {
    id: "power-query",
    title: "Power Query Data Transformation",
    category: "Data Transformation",
    description:
      "A data transformation project demonstrating how Power Query can be used to prepare, clean and structure raw data through a repeatable transformation workflow.",
    supportingDetails:
      "This project showcases data preparation techniques that help simplify repetitive data processing and make datasets more suitable for analysis.",
    features: [
      "Data transformation workflow",
      "Data cleaning and preparation",
      "Structured data output",
      "Repeatable transformation steps",
    ],
    image: "/src/assets/images/portfolio_power_query_1795256348525.jpg",
    imageAlt:
      "Repeatable Power Query data transformation workflow from raw table input through transformation steps to structured output",
    projectUrl: "REPLACE_WITH_POWER_QUERY_GOOGLE_SHEETS_URL",
  },
];
