import styled from 'styled-components'

const Flex = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    justify-content: ${props => props.justifyCenter
            ? 'center' :
            props.justifyBetween ?
                'space-between'
                : 'init'
    };
    align-items: ${props => props.alignCenter
        ? 'center' :
        props.alignBetween ?
            'space-between'
            : 'init'
    };

`
export default Flex
