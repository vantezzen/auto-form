import { z } from "zod";
import AutoForm from "../index";

describe("<AutoForm />", () => {
  it("renders fields", () => {
    const formSchema = z.object({
      username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),

      password: z.string().describe("Your secure password").min(8, {
        message: "Password must be at least 8 characters.",
      }),
    });

    cy.mount(<AutoForm formSchema={formSchema} />);
    cy.get("input[name=username]").should("exist");
    cy.get("input[name=password]").should("exist");
  });

  it("renders fields with custom labels", () => {
    const formSchema = z.object({
      username: z.string().describe("Your username"),
    });

    cy.mount(<AutoForm formSchema={formSchema} />);

    cy.get("label").contains("Your username");
  });

  it("generates default labels", () => {
    const formSchema = z.object({
      someFieldName: z.string(),
    });

    cy.mount(<AutoForm formSchema={formSchema} />);

    cy.get("label").contains("Some Field Name");
  });

  it("allows setting custom field labels", () => {
    const formSchema = z.object({
      someFieldName: z.string(),
    });

    cy.mount(
      <AutoForm
        fieldConfig={{
          someFieldName: {
            label: "My field name",
          },
        }}
        formSchema={formSchema}
      />,
    );

    cy.get("label").contains("My field name");
  });

  it("allows setting custom field props", () => {
    const formSchema = z.object({
      username: z.string(),
    });

    cy.mount(
      <AutoForm
        formSchema={formSchema}
        fieldConfig={{
          username: {
            inputProps: {
              placeholder: "Enter your username",
            },
          },
        }}
      />,
    );

    cy.get("input[name=username]").should(
      "have.attr",
      "placeholder",
      "Enter your username",
    );
  });

  it("allows setting custom field type", () => {
    const formSchema = z.object({
      username: z.string(),
    });

    cy.mount(
      <AutoForm
        formSchema={formSchema}
        fieldConfig={{
          username: {
            fieldType: "number",
          },
        }}
      />,
    );

    cy.get("input").should("have.attr", "type", "number");
  });

  it("can submit valid forms", () => {
    const formSchema = z.object({
      username: z.string(),
    });

    cy.mount(
      <AutoForm
        formSchema={formSchema}
        onSubmit={(values) => {
          expect(values).to.deep.equal({
            username: "john",
          });
        }}
      >
        <button type="submit">Submit</button>
      </AutoForm>,
    );

    cy.get("input[name=username]").type("john");
    cy.get("button[type=submit]").click();
  });

  it("shows error for invalid forms", () => {
    const formSchema = z.object({
      username: z.string(),
    });

    cy.mount(
      <AutoForm
        formSchema={formSchema}
        onSubmit={() => {
          expect.fail("Should not be called.");
        }}
      >
        <button type="submit">Submit</button>
      </AutoForm>,
    );

    cy.get("button[type=submit]").click();
  });

  it("can set default values", () => {
    const formSchema = z.object({
      username: z.string().default("john"),
    });

    cy.mount(<AutoForm formSchema={formSchema} />);

    cy.get("input[name=username]").should("have.value", "john");
  });

  it("can submit with default values", () => {
    const formSchema = z.object({
      username: z.string().default("john"),
    });

    cy.mount(
      <AutoForm
        formSchema={formSchema}
        onSubmit={(values) => {
          expect(values).to.deep.equal({
            username: "john",
          });
        }}
      >
        <button type="submit">Submit</button>
      </AutoForm>,
    );

    cy.get("button[type=submit]").click();
  });

  it("can set and submit optional values", () => {
    const formSchema = z.object({
      username: z.string().optional(),
    });

    cy.mount(
      <AutoForm
        formSchema={formSchema}
        onSubmit={(values) => {
          expect(values).to.deep.equal({
            username: undefined,
          });
        }}
      >
        <button type="submit">Submit</button>
      </AutoForm>,
    );

    cy.get("input[name=username]").should("have.value", "");
    cy.get("button[type=submit]").click();
  });

  it("can add description", () => {
    const formSchema = z.object({
      username: z.string(),
    });

    cy.mount(
      <AutoForm
        formSchema={formSchema}
        fieldConfig={{
          username: {
            description: "Your username here",
          },
        }}
      />,
    );

    cy.get("p").contains("Your username here");
  });

  it("can set default values on array", () => {
    const formSchema = z.object({
      arr: z.array(z.object({ name: z.string(), age: z.number() })).default([
        { name: "Haykal", age: 21 },
        { name: "John", age: 20 },
      ]),
    });

    cy.mount(<AutoForm formSchema={formSchema} />);

    //get button with text Arr
    cy.get("button").contains("Arr").click();
    cy.get("input[name='arr.0.name']").should("have.value", "Haykal");
    cy.get("input[name='arr.0.age']").should("have.value", "21");
    cy.get("input[name='arr.1.name']").should("have.value", "John");
    cy.get("input[name='arr.1.age']").should("have.value", "20");
  });

  it("can set default value of number to 0", () => {
    const formSchema = z.object({
      number: z.number().default(0),
    });

    cy.mount(<AutoForm formSchema={formSchema} />);

    cy.get("input[name='number']").should("have.value", "0");
  });
});
