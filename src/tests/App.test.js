import React from 'react';
import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

afterEach(() => jest.clearAllMocks());

describe('Testa a aplicação', () => {
  it('Verifica se todos os headers estão presentes na aplicação', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    await act( async () => render(
      <AppProvider>
        <App/>
      </AppProvider>
    ));

    const nameEl = screen.getByText('Name');
    const rotationPeriodEl = screen.getByText('Rotation Period');
    const orbitalPeriodEl = screen.getByText('Orbital Period');
    const diameterEl = screen.getByText('Diameter');
    const climateEl = screen.getByText('Climate');
    const gravityEl = screen.getByText('Gravity');
    const terrainEl = screen.getByText('Terrain');
    const surfaceWaterEl = screen.getByText('Surface Water');
    const populationEl = screen.getByText('Population');
    const filmsEl = screen.getByText('Films');
    const createdEl = screen.getByText('Created');
    const editedEl = screen.getByText('Edited');
    const urlEl = screen.getByText('URL');

    expect(nameEl).toBeInTheDocument();
    expect(rotationPeriodEl).toBeInTheDocument();
    expect(orbitalPeriodEl).toBeInTheDocument();
    expect(diameterEl).toBeInTheDocument();
    expect(climateEl).toBeInTheDocument();
    expect(gravityEl).toBeInTheDocument();
    expect(terrainEl).toBeInTheDocument();
    expect(surfaceWaterEl).toBeInTheDocument();
    expect(populationEl).toBeInTheDocument();
    expect(filmsEl).toBeInTheDocument();
    expect(createdEl).toBeInTheDocument();
    expect(editedEl).toBeInTheDocument();
    expect(urlEl).toBeInTheDocument();
  });

  it('Verifica se todos os headers estão presentes na aplicação', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    await act( async () => render(
      <AppProvider>
        <App/>
      </AppProvider>
    ));
    
    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });

  it('Verifica se a tabela foi renderizada corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    await act( async () => render(
      <AppProvider>
        <App/>
      </AppProvider>
    ));
    
    const tatooine = screen.queryByText('Tatooine');
    const alderaan = screen.queryByText('Alderaan');
    expect(tatooine).toBeInTheDocument();
    expect(alderaan).toBeInTheDocument();
  });


  it('Verifica se o filtro de nome funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    await act( async () => render(
      <AppProvider>
        <App/>
      </AppProvider>
    ));
      
    const nameFilter = screen.getByTestId('name-filter');

    userEvent.type(nameFilter, 'o');
    const tatooine = screen.queryByText('Tatooine');
    const alderaan = screen.queryByText('Alderaan');
    expect(tatooine).toBeInTheDocument();
    expect(alderaan).not.toBeInTheDocument();
  });

  // it('Verifica se os filtros funcionam corretamente', async () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(testData),
  //   });

  //   await act( async () => render(
  //     <AppProvider>
  //       <App/>
  //     </AppProvider>
  //   ));
      
  //   const columnFilter = screen.getByTestId('column-filter');
  //   const comparisonFilter = screen.getByTestId('comparison-filter');
  //   const valueFilter = screen.getByTestId('value-filter');
  //   const buttonFilter = screen.getByTestId('button-filter');

  //   userEvent.selectOptions(columnFilter, 'diameter');
  //   userEvent.selectOptions(comparisonFilter, 'menor que');
  //   userEvent.type(valueFilter, 8900);
  //   userEvent.click(buttonFilter);

  //   const endor = screen.queryByText('Endor');
  //   const dagobah = screen.queryByText('Dagobah');
  //   expect(endor).toBeInTheDocument();
  //   expect(dagobah).not.toBeInTheDocument();
  // });
});
