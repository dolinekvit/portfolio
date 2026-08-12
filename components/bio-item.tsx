import { DataList } from '@chakra-ui/react';

interface BioItemProps {
  label: string | number;
  value: string;
}

export function BioItem({ label, value }: BioItemProps) {
  return (
    <DataList.Item>
      <DataList.ItemLabel minW={'50px'}>{label}</DataList.ItemLabel>
      <DataList.ItemValue>{value}</DataList.ItemValue>
    </DataList.Item>
  );
}
