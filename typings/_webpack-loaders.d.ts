declare module "*.yaml" {
  const data: any;
  export default data;
}

declare module "*.jpeg" {
  const uri: string;
  export default uri;
}
