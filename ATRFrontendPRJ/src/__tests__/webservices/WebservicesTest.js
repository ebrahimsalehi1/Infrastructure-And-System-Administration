// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
//import '@testing-library/jest-dom/extend-expect'
// the component to test
//import Fetch from '../fetch'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/greeting', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json({ greeting: 'hello there' }))
    })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

// ...

test('handlers server error', async () => {
    server.use(
        // override the initial "GET /greeting" request handler
        // to return a 500 Server Error
        rest.get('http://bpmdev.msc.ir/ATR/api/v1.0/zoneWithPowerUser/grid?size=10&page=0&filter=&', (req, res, ctx) => {
            console.log("data to show",res,req,ctx)
            return res(ctx.status(500))
        })
    )

    // ...
})

