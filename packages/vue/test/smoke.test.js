const { mount } = require('@vue/test-utils')
const { Alert24 } = require('../lib/icons')

describe('Basic Component Mounting', () => {
  it('exposes the correct vue components', () => {
    const wrapper = mount(Alert24)

    expect(wrapper.html()).toContain('viewBox="0 0 24 24"')
  })

  it('should allow scaling properties', () => {
    const wrapper = mount(Alert24, {
      propsData: {
        scale: 2.5
      }
    })

    expect(wrapper.attributes().height).toEqual('60')
    expect(wrapper.attributes().width).toEqual('60')
  })
})