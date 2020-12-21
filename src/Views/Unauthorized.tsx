import { FC } from 'react';
import { Helmet } from 'react-helmet';

const NotFound: FC = () => (
    <div>
        <Helmet>
            <link rel="stylesheet" href="unauthorized.css"/>
        </Helmet>
        <div className="cage"></div>
        <h1><span>403</span></h1>
    </div>
);

export default NotFound;