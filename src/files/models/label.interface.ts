interface LabelValue {
  [key: string]: string;
}

export default interface Label {
  name: string;
  values: LabelValue;
}
