import { FC } from "react";
import { ResourceType } from "@/components/ContributeForm";

interface ResourceItemProps {
  name: string;
  userId: string;
  createdAt: Date;
  acadYear: string;
  semester: string;
  category: ResourceType;
}
 
const ResourceItem: FC<ResourceItemProps> = ({ name, userId, createdAt, acadYear, semester, category }) => {
  return ( 
    <tr>
      <td>{name}</td>
      <td>{userId}</td>
      <td>{createdAt.toISOString()}</td>
      <td>{`${acadYear} S${semester}`}</td>
      <td>test</td>
    </tr>
   );
}
 
export default ResourceItem;