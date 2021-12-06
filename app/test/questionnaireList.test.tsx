/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LandingPage from '../src/components/landingPage/landingPage'

test('Landing page renders properly', async () => {
    render(<LandingPage />)
    expect(screen.getByTestId('title1')).toHaveTextContent('Access questionnaire by ID')
    expect(screen.getByTestId('title2')).toHaveTextContent('Select a questionnaire')
    expect(screen.getByRole('button')).not.toBeDisabled()
})

