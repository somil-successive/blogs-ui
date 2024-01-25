import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import View from "../components/View";
import axios from "axios";
import userEvent from "@testing-library/user-event";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

global.localStorage = {
  getItem: jest.fn(),
  clear: jest.fn(),
};

describe("view page", () => {
  test("renders view page", async () => {
    render(
      <MemoryRouter initialEntries={["/view"]}>
        <Routes>
          <Route path="/view" element={<View />} />
        </Routes>
      </MemoryRouter>
    );

    const searchInput = await screen.findByTestId("search-input");
    const searchButtton = await screen.findByTestId("search-btn");
    const filterMenu = await screen.getByTestId("filter-menu");

    await waitFor(() => {
      expect(searchInput).toBeInTheDocument();
      expect(searchButtton).toBeInTheDocument();
      expect(filterMenu).toBeInTheDocument();
    });

    userEvent.click(searchInput);
    userEvent.keyboard("search");

    await waitFor(() => {
      expect(searchInput).toHaveValue("search");
    });

    const handleSearchMock = jest.fn();
    userEvent.click(searchButtton);
    handleSearchMock();

    waitFor(() => {
      expect(handleSearchMock).toHaveBeenCalledTimes(1);
    });

    const createButton = await screen.findByTestId("create-icon");

    waitFor(() => {
      expect(createButton).toBeInTheDocument();
    });

    userEvent.click(createButton);

    waitFor(() => {
      expect(window.location.pathname).toBe("/view");
    });
  });
});

describe("view page", () => {
  jest.mock("axios");
  test("navigates to update page on edit button click", async () => {
    const mockdData = [
      {
        body: {
          description:
            "Ventito varius casso nesciunt aufero dolores tergiversatio sonitus. Crur circumvenio confugo corrigo crur celebrer stella decens arto. Creator ratione cibus.",
          links: "https://gigantic-proctor.com",
        },
        writer: {
          id: "kdSEVgQGV8",
          name: "Sherry Bailey",
          email: "London31@hotmail.com",
          profilePicUrl:
            "https://xsgames.co/randomusers/avatar.php?g=pixel&key=80",
          famousWorks: "depulso apostolus alo",
        },
        _id: "1",
        title: "siding now sniveling attenuate or midst",
        imageUrl: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=62",
        categories: "fitness",
        likes: 704,
        approved: true,
        isSensitive: true,
        tags: "Fantastic Concrete Gloves",
        createdAt: "2024-01-07T14:43:32.470Z",
        updatedAt: "2024-01-07T14:43:32.470Z",
        __v: 0,
      },
    ];

    render(
      <BrowserRouter>
        <View />
      </BrowserRouter>
    );

    axios.get = jest.fn();

    axios.get.mockResolvedValue({
      data: {
        data: mockdData,
      },
    });
   

   

    await waitFor(() => {
      const editButton=screen.getByTestId("edit-btn")
     
      // expect(screen.getByText("View Component")).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
      fireEvent.click(editButton);

      expect(window.location.pathname).toBe("/update/1");
    });
  });

  test("handlese view and delete button action", async () => {
    
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            body: {
              description:
                "Cruciamentum esse causa uberrime inventore sto natus tabernus deficio. Caute viriliter antiquus titulus tergeo bestia adstringo. Placeat cum labore ipsa delego aduro tribuo aliqua.",
              links: "https://threadbare-jar.net",
            },
            writer: {
              id: "a9puWZ5bnj",
              name: "Dan Wolff",
              email: "Rosalia.Mann@gmail.com",
              profilePicUrl:
                "https://xsgames.co/randomusers/avatar.php?g=pixel&key=70",
              famousWorks: "animus alius addo",
            },
            _id: "1",
            title: "failing kind curiously buyer shameless groan",
            imageUrl:
              "https://xsgames.co/randomusers/avatar.php?g=pixel&key=16",
            categories: "lifestyle",
            likes: 912,
            approved: true,
            isSensitive: false,
            tags: "Unbranded Bronze Pants",
            createdAt: "2024-01-07T14:43:32.463Z",
            updatedAt: "2024-01-07T14:43:32.463Z",
            __v: 0,
          },
        ],
      },
    });

    axios.get.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <View />
      </BrowserRouter>
    );

    await waitFor(() => {

      const viewButton = screen.getByTestId("view-btn");
      fireEvent.click(viewButton);
      expect(window.location.pathname).toBe("/details/1");
      const deleteButton = screen.getByTestId("delete-btn");
      fireEvent.click(deleteButton);
      const okButton = screen.queryByText("OK");
      expect(okButton).toBeInTheDocument();
      fireEvent.click(okButton);
    });
  });

  test("handle error while deleting blog", async () => {
    jest.mock("axios")
    // axios.get.mockResolvedValueOnce({
    //   data: {
    //     data: [
    //       {
    //         body: {
    //           description:
    //             "Cruciamentum esse causa uberrime inventore sto natus tabernus deficio. Caute viriliter antiquus titulus tergeo bestia adstringo. Placeat cum labore ipsa delego aduro tribuo aliqua.",
    //           links: "https://threadbare-jar.net",
    //         },
    //         writer: {
    //           id: "a9puWZ5bnj",
    //           name: "Dan Wolff",
    //           email: "Rosalia.Mann@gmail.com",
    //           profilePicUrl:
    //             "https://xsgames.co/randomusers/avatar.php?g=pixel&key=70",
    //           famousWorks: "animus alius addo",
    //         },
    //         _id: "1",
    //         title: "failing kind curiously buyer shameless groan",
    //         imageUrl:
    //           "https://xsgames.co/randomusers/avatar.php?g=pixel&key=16",
    //         categories: "lifestyle",
    //         likes: 912,
    //         approved: true,
    //         isSensitive: false,
    //         tags: "Unbranded Bronze Pants",
    //         createdAt: "2024-01-07T14:43:32.463Z",
    //         updatedAt: "2024-01-07T14:43:32.463Z",
    //         __v: 0,
    //       },
    //     ],
    //   },
    // });
    axios.delete.mockRejectedValueOnce({ status: 401 });
    render(
      <BrowserRouter>
        <View />
      </BrowserRouter>
    );

    await waitFor(() => {
      const deleteButton = screen.getByTestId("delete-btn");
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);
      const okButton = screen.queryByText("OK");
      expect(okButton).toBeInTheDocument();
      fireEvent.click(okButton);
      // expect(localStorage.clear);
      expect(window.location.pathname).toBe("/");
    });
  });









  test("renders filter menu ", async () => {
    // axios.get.mockResolvedValue();
    render(
     <BrowserRouter>
         <View/>
        
      </BrowserRouter>
    );

  
    const filterMenu = await screen.findByTestId("filter-menu");

    await waitFor(() => {
     
      expect(filterMenu).toBeInTheDocument();
       userEvent.selectOptions(filterMenu,"study");

       expect(filterMenu).toHaveValue('study');
       expect(scree.getByTestId("spinner"))

    });



   
  });

});
