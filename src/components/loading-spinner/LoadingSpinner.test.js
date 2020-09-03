import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner.component';
import LoadingSpinnerHOC from './LoadingSpinner.hoc';

describe('LoadingSpinner component', () => {
    it('should render LoadingSpinner', () => {
        expect(shallow(<LoadingSpinner />)).toMatchSnapshot();
    });
});

describe('High Order Component LoadingSpinner', () => {
    describe('If isLoading is true', () => {
        const mockProps = {
            isLoading: true,
            className: 'foo',
            onClick: () => {}
        }
    
        const TestComponent = () => <div id="test" />;
        const WrappedComponent = LoadingSpinnerHOC(TestComponent);
        const wrapper = shallow(<WrappedComponent { ...mockProps } />);
    
        it('should render LoadingSpinner', () => {
            expect(wrapper.exists(LoadingSpinner)).toBe(true);
        });
    
        it('should not render TestComponent', () => {
            expect(wrapper.exists(TestComponent)).toBe(false);
        });
    });
    
    describe('If isLoading is false', () => {
        const mockProps = {
            isLoading: false,
            className: 'foo',
            onClick: () => {}
        }
    
        const TestComponent = () => <div id="test" />;
        const WrappedComponent = LoadingSpinnerHOC(TestComponent);
        const wrapper = shallow(<WrappedComponent { ...mockProps } />);
    
        it('should render TestComponent', () => {
            expect(wrapper.exists(TestComponent)).toBe(true);
        });
    
        it('should not render LoadingSpinner', () => {
            expect(wrapper.exists(LoadingSpinner)).toBe(false);
        });
    });
});