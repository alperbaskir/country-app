import '@testing-library/jest-dom/extend-expect'
import { render,screen, queryByAttribute  } from '@testing-library/react'
import SelectBox from '../../../src/components/select/index'

describe('with items with name property', () => {
    it('renders the search box', () => {
        const optionList = [
            {
                name: "Sweden",
            },
            {
                name: "Turkey",
            }
        ]
        const getById = queryByAttribute.bind(null, 'id');
        const selectComponent = render(<SelectBox optionList={optionList}/>)
        const selectItem = getById(selectComponent.container, 'country');
        expect(selectItem).toBeInTheDocument()
})
})