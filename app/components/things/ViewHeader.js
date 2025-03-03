import { Heading } from '@/app/components/typography';
import { Button } from '@/app/components/button';

const ViewHeader = ({ heading = '', tools = null }) => {
   const Toolbar = () => (
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
         {tools.map(tool => (
            <Button linkStyle key={tool.key} onClick={e => tool.onClick(tool.key)}>
               {tool.label}
            </Button>
         ))}
      </div>
   );

   return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
         {heading && <Heading level='1'>{heading}</Heading>}
         {tools && <Toolbar />}
      </div>
   );
};

export default ViewHeader;
