import React from 'react';
import Background from '@/components/Background';
import Content from '@/components/Content';

const ContentScreen = ({ loading, content }) => {
        return (
            <>
                {
                    loading === false ?
                    <>
                        <Content {...{ content }} />
                    </>
                    :
                    <Background />
                }
            </>
        )
}

export default ContentScreen;