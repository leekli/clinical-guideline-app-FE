import { Space, Alert, Collapse, Divider } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const HelpHome = () => {
  const anyUserHelpData = [
    {
      key: 1,
      title: "About: Clinical Guideline Authoring App",
      content: (
        <div>
          <p>
            The Clinical Guideline Authoring App is a tool which allows
            clinicans to view guidelines.
          </p>
          <p>
            It is also an authoring system which allows approved users to edit
            existing Clinical Guidelines with a number of authoring tools. It
            also allows for the creation of new Clinical Guidelines.
          </p>
          <p>
            Additionally it also allows users of 'Approver' status to review
            proposed changes to a Clincial Guideline, and either allow the
            integration of a new Guideline version, or reject it.
          </p>
        </div>
      ),
    },
    {
      key: 2,
      title: "Searching for Guidelines",
      content: (
        <div>
          <p>
            On the Homepage (titled: 'Home: All Guidelines' in the Navigation
            Bar), you are able to use the search bar to search for specific
            guidelines.
          </p>
          <p>
            As you type into the search bar, the list of Guidelines will narrow
            in real-time, depending on your search term.
          </p>
          <p>
            If your search term does not match a Guideline, then the guidelines
            list will be empty.
          </p>
          <p>
            You are able to either: delete the text in the search bar yourself,
            or click the 'x' icon at the end of the input field to clear the
            search bar.
          </p>
        </div>
      ),
    },
    {
      key: 3,
      title: "Viewing Individual Guidelines",
      content: (
        <div>
          <p>
            On the Homepage (titled: 'Home: All Guidelines' in the Navigation
            Bar), you are able to click an individual Clinical Guideline to read
            its content.
          </p>
          <p>
            Either: Click the title of the Clinical Guideline, or click the
            'View Guideline: (Number Here)' blue button at the right hand corner
            of the guideline.
          </p>
        </div>
      ),
    },
    {
      key: 4,
      title: "Guideline Change History Tracker",
      content: (
        <div>
          <p>
            When you view a single, individual Clinical Guideline - A 'Change
            History Tracker' is available at the end of each Clinical Guideline
            page.
          </p>
          <p>
            This is provided for transparency on changes which have been made to
            a Clinical Guideline over time.
          </p>
          <p>
            If no changes have ever been made to a Clinical Guideline, then the
            tracker will state this.
          </p>
          <p>
            If change(s) have been made to a Clinical Guideline, a list in table
            format will be presented giving a summary of the changes: Why they
            were made, who made them, and when they were incorporated into the
            guideline.
          </p>
        </div>
      ),
    },
    {
      key: 5,
      title: "Logging Out",
      content: (
        <div>
          <p>To log out, click the 'Log Out' button in top Navigation bar.</p>
        </div>
      ),
    },
  ];

  const authorHelpData = [
    {
      key: 1,
      title: "Submitting a Guideline for Editing",
      content: (
        <div>
          <p>
            To Submit a Guideline for Editing and Authoring processes, first you
            will need to be on the 'Home: All Guidelines' page, and from here
            select the Guideline you wish to edit.
          </p>
          <p>
            If your user account has the relevant access level, then you will
            see a green 'Submit Guideline for Editing...' button. Click this
            button.
          </p>
          <p>
            You'll then be presented with a Modal dialog box, here you will
            submit a name which you wish to identify your Editing/Guideline
            Workspace as.
          </p>
          <p>
            Once complete, press the 'Submit' button, and a request will be sent
            to initalise the Guideline for editing, and set you up a Workspace
            in order to do this.
          </p>
        </div>
      ),
    },
    {
      key: 2,
      title: "My Authoring Workspace",
      content: (
        <div>
          <p>
            You can access your Authoring Workspace by clicking the 'My
            Authoring Workspace' in the top navigation bar.
          </p>
          <p>
            Within this page, a user with relevant access rights
            (Author/Editor/Admin) will see any guidelines which are they are
            able to collaborate on.
          </p>
          <p>
            If there are guideline workspaces to collaborate on, then a message
            will be displayed stating such.
          </p>
        </div>
      ),
    },
    {
      key: 3,
      title: "Creating a New Guideline",
      content: (
        <div>
          <p>
            In the 'My Authoring Workspace', a brand new Guideline template can
            be produced, with the intention for collaborators to create a new
            Guideline.
          </p>
          <p>
            The blue button titled 'Create a New Guideline' will allow the start
            of the process.
          </p>
          <p>
            Once clicked, a Modal dialog will be presented for the user to add
            some inital, set up information including:
          </p>
          <ul>
            <li>A proposed Guideline Name</li>
            <li>A proposed Guideline Number/ID</li>
            <li>
              A name for the new Authoring Workspace which will be created for
              this new Guideline to allow further editing / authoring
            </li>
          </ul>
          <p>
            Once complete, press the 'Submit' button, and a new guideline
            template will be set up.
          </p>
          <p>
            Once this is successful, authorised collaborators will be able to
            view this Guideline in the 'My Authoring Workspace' menu.
          </p>
          <p>
            <em>
              Note: When a New Guideline template is set up, the template
              includes some general Sections and Sub-Sections with minimal
              content, the authoring system can be used to edit all of these
              titles and content sections later.
            </em>
          </p>
        </div>
      ),
    },
    {
      key: 4,
      title: "Viewing an Individual Workspace",
      content: (
        <div>
          <p>
            In the 'My Authoring Workspace' menu, if there any Guideline which
            collaborators are authorised to work on, they see will them listed
            here.
          </p>
          <p>
            To view a Guideline Authoring Workspace, either click its title or
            the blue 'View Guideline Workspace' link on the right hand side.
          </p>
          <p>
            A new page will load with a number of options available to that
            Authoring workspace.
          </p>
        </div>
      ),
    },
    {
      key: 5,
      title: "Workspace Collaborator Comments",
      content: (
        <div>
          <p>
            All Guideline Authoring Workspaces have the ability for authorised
            collaborators to view and add new comments to a workspace.
          </p>
          <p>
            These are available by either clicking the green 'View Collaborator
            Comments' button in a single workspace page, or they are available
            by scrolling to the buttom of the page.
          </p>
          <p>
            New comments can be added by authorised collaborators only, this can
            be found in the 'Workspace Comments' section towards the bottom of a
            single workspace page.
          </p>
        </div>
      ),
    },
    {
      key: 6,
      title: "Adding Collaborators to a Workspace",
      content: (
        <div>
          <p>
            Workspace Owners and Authorised Collaborators are able to add
            additional collaborators to a single workspace.
          </p>
          <p>
            To do this, on a Single Workspace page, click the blue 'Add
            Collaborators...' button.
          </p>
          <p>
            A modal dialog with a drop down box will be presented, here you can
            select which user to add.
          </p>
          <p>
            <em>
              Only users with Viewer/Editor/Q.C access priviledges are permitted
              to be added.
            </em>
          </p>
          <p>
            New collaborators will be added once the 'Add user' button is
            clicked. When the newly added collaborator next logs in, they'll see
            this workspace available to them in the 'My Authoring Workspaces'
            menu/page.
          </p>
        </div>
      ),
    },
    {
      key: 7,
      title: "Locking and Unlocking a Workspace",
      content: (
        <div>
          <p>An Authoring Workspace can be locked or unlocked.</p>
          <p>
            Locked means that no further edits are able to be made, and any
            editing / authoring functionality is removed.
          </p>
          <p>
            Unlocked means that further edits can be made, and editing /
            authoring functionality will be visible.
          </p>
          <p>
            Any Workspace owner can lock and unlock a Workspace at any time.
          </p>
          <p>
            <em>
              Note: A Workspace will be permanently locked when it has been
              submitted for Approval, to ensure no further edits can be made
              whilst an Pending Approval is in progress.
            </em>
          </p>
          <p>
            <em>
              Note: If a Pending Approval is Rejected, then the Workspace will
              be automatically unlocked, to allow for further editing /
              authoring.
            </em>
          </p>
        </div>
      ),
    },
    {
      key: 8,
      title: "Deleting a Workspace",
      content: (
        <div>
          <p>
            A Guideline Authoring Workspace can be deleted, and is only able to
            be deleted by the Workspace Owner only.
          </p>
          <p>
            To do this, in a single Workspace page, the Workspace Owner will see
            a red 'Delete Workspace' button.
          </p>
          <p>
            Clicking this will present a confirmation box, the user can either
            can the action, or confirm the deletion request by clicking 'Yes'.
          </p>
          <p>
            Once confirmed, the Workspace will be deleted from the Authoring
            Workspaces page.
          </p>
          <p>
            <em>
              Note: This will delete ALL edits made to date on the relevant
              Guideline, and all work will be lost.
            </em>
          </p>
        </div>
      ),
    },
    {
      key: 9,
      title: "Editing and Authoring: The Editor",
      content: (
        <div>
          <p>
            There is a number of functionality available for authoring of a
            Guideline. More specific information is provided in the below Help
            sections.
          </p>
          <p>
            In a Guideline, any main Section and any sub-Section can be edited.
          </p>
          <p>New sub sections can also be added.</p>
          <p>
            To access the editor functionality, first access any Authoring
            Workspace available to you.
          </p>
          <p>
            Next, navigate to the actual Guideline, expand the section you wish
            to edit, and you should see a green 'Edit Section: X' button,
            clicking this will give you access to the real-time editor.
          </p>
        </div>
      ),
    },
    {
      key: 10,
      title: "Editing and Authoring: Changing a Section's Title",
      content: (
        <div>
          <p>
            In the Editor, you have the ability to update a Sections Title (and
            therefore the section title any user / viewer / clinican will see).
          </p>
          <p>
            To edit a title, use the input box provided to give a new section
            title.
          </p>
          <p>Then click the blue 'Save Progress' button</p>
        </div>
      ),
    },
    {
      key: 11,
      title: "Editing and Authoring: Changing a Section's Content",
      content: (
        <div>
          <p>
            In the Editor, you have the ability to update all of a Sections
            content (and therefore the section content any user / viewer /
            clinican will see).
          </p>
          <p>To edit a sections content, use the input box provided.</p>
          <p>
            There are a limited number of formatting options available to you,
            to format your submission, including:
          </p>
          <ul>
            <li>Change text size and header settings</li>
            <li>Bold</li>
            <li>Italics</li>
            <li>Underline</li>
            <li>Ability to add hyperlinks to text</li>
            <li>A numbered / ordered list</li>
            <li>A bullet point / unordered list</li>
          </ul>
          <p>
            You also have the ability to undo actions by pressing Ctrl+Z or
            Command+Z (Mac).
          </p>
          <p>Then click the blue 'Save Progress' button</p>
        </div>
      ),
    },
    {
      key: 12,
      title: "Editing and Authoring: Adding an Image & Caption",
      content: (
        <div>
          <p>
            In the Editor, you have the ability to add an Image and some Image
            Caption text into a Section.
          </p>
          <p>
            To add an image and caption, click the green 'Add Image & Caption'
            button
          </p>
          <p>
            You'll need to provide a direct Image URL Link to the image, and
            some caption text which will sit centered underneath the image you
            provide.
          </p>
          <p>
            Once complete, press 'OK' and you will see the Image and caption
            text now visible in the main Editor.
          </p>
          <p>Then click the blue 'Save Progress' button</p>
          <p>
            <em>Note: You are not able to upload images.</em>
          </p>
        </div>
      ),
    },
    {
      key: 13,
      title: "Editing and Authoring: Saving progress",
      content: (
        <div>
          <p>
            It is highly recommended you regularly save your progress, by
            pressing the blue 'Save Progress' button.
          </p>
          <p>
            Each time you press this button, and the save is successful, you
            will see an alert stating it was successful.
          </p>
        </div>
      ),
    },
    {
      key: 14,
      title: "Editing and Authoring: Cancelling Changes / Going Back",
      content: (
        <div>
          <p>
            If you need to cancel the operation or go back to the Guideline
            Workspace space, click the red 'Cancel Changes / Go Back' button.
          </p>
        </div>
      ),
    },
    {
      key: 10,
      title: "Submitting a Guideline for Approval",
      content: (
        <div>
          <p>
            Once all collaborators have made their edits, changes, etc to a
            guideline; then it can be submitted for Approval.
          </p>
          <p>
            Click the blue 'Submit Guideline for Approval' button in a single
            Workspace page.
          </p>
          <p>
            You'll be presented with a modal dialog, to submit a brief
            description of the changes made, and any other general notes which
            you wish the Approver(s) to see.
          </p>
          <p>
            This should be an accurate description of changes made, and should
            therefore be informative but brief.
          </p>
          <p>
            Once submitted, the Guideline Authoring Workspace will be
            automatically <strong>locked</strong>, meaning no further changes or
            edits can be made whilst the Guideline is Pending Approval.
          </p>
        </div>
      ),
    },
  ];

  const approverHelpData = [
    {
      key: 1,
      title: "My Approvals Workspace",
      content: (
        <div>
          <p>
            You can access your Approvals Workspace by clicking the 'My
            Approvals Workspace' in the top navigation bar.
          </p>
          <p>
            Within this page, an approver will see any pending approvals which
            are they are able to view.
          </p>
          <p>
            If there are no pending approvals, then a message will be displayed
            stating such.
          </p>
        </div>
      ),
    },
    {
      key: 2,
      title: "Viewing an Individual Pending Approval",
      content: (
        <div>
          <p>
            In the 'My Approvals Workspace' menu, if there any outstanding
            pending approvals, they will be listed.
          </p>
          <p>
            To view a pending approval, either click its title or the blue 'View
            Pending Approval Request' link on the right hand side.
          </p>
          <p>
            A new page will load with a number of options available to that
            pending approval request.
          </p>
        </div>
      ),
    },
    {
      key: 3,
      title: "Reading an Amended Guideline",
      content: (
        <div>
          <p>
            Once in an individual pending approval, a blue button titled 'Read
            Amended Guideline in Full' will be available to click.
          </p>
          <p>
            Clicking this button will load a new Modal screen, with the entire
            guideline within.
          </p>
          <p>
            All changes made to the guideline will be viewable in this modal
            screen, so an Approver has the most recent and up to date proposed
            changes to be made to a Clinical Guideline.
          </p>
          <p>
            To edit the Guideline Modal Screen, either click the 'Cancel'
            button, or click anywhere outside the modal screen and it will
            automatically close.
          </p>
        </div>
      ),
    },
    {
      key: 4,
      title: "Accepting an Approval Request",
      content: (
        <div>
          <p>
            If an Approver is satisfied with the requested changes, they can
            press the Green 'Accept Approval Request and Merge Changes' button.
          </p>
          <p>
            A confirmation box will appear, to confirm you do wish to accept the
            change, with the ability to cancel it, if required.
          </p>
          <p>This will trigger a number of events to happen:</p>
          <ul>
            <li>
              The Guideline will be merged with the main guideline which all
              users can view.
            </li>
            <li>
              The current 'Authoring Workspace' for this Guideline will then be
              deleted.
            </li>
            <li>The current Approval Request will finally be deleted.</li>
          </ul>
          <p>
            All new changes will now be visible to all users, along with an
            update to the 'Guideline Change History Tracker' now viewable for
            all users to see why a change was made.
          </p>
        </div>
      ),
    },
    {
      key: 5,
      title: "Rejecting an Approval Request",
      content: (
        <div>
          <p>
            If an Approver is not satisifed with the requested changes, they can
            press the Red 'Reject Approval and Add a Justification' button.
          </p>
          <p>
            A box will appear, where the Approver is able to add a detailed
            commentary as to why they are rejecting the approval.
          </p>
          <p>
            If you wish to cancel this action, then press the 'Cancel' button.
          </p>
          <p>
            If the rejection is confirmed, by pressing the 'Reject Request'
            button after provided a rejection justification comment, then this
            will trigger a number of events to happen:
          </p>
          <ul>
            <li>
              The rejection comment will be added to the applicable 'Authoring
              Workspace' for the guideline, for all Collaborators to view and
              read.
            </li>
            <li>
              The applicable 'Authoring Workspace' will be unlocked, allowing
              collaborators to continue to make edits and further changes.
            </li>
            <li>
              The current Approval Request will be deleted (due to the request
              being rejected)
            </li>
          </ul>
          <p>
            Note: Following an approval rejection, collaborators will need to
            submit a *new* approval request for any future changes.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <section>
        <Space
          direction="vertical"
          style={{
            width: "75%",
          }}
        >
          <Alert
            message={<strong>Help & Support</strong>}
            description={`This area contains answers help & support, on how to use this application.`}
            type="info"
            showIcon
          />
        </Space>
      </section>

      <Divider style={{ width: "75vw" }} />

      <h3>
        <QuestionCircleOutlined />
        &nbsp;
        <u>Help for All Users & Clinicans</u>
      </h3>
      {anyUserHelpData.map((helpSection) => {
        return (
          <>
            <center>
              <Collapse
                accordion
                bordered={true}
                size="large"
                style={{ borderColor: "darkgray", width: "75vw" }}
                items={[
                  {
                    key: helpSection.key,
                    label: <strong>{helpSection.title}</strong>,
                    children: (
                      <div>
                        <p>{helpSection.content}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </center>
          </>
        );
      })}

      <br />
      <Divider style={{ width: "75vw" }} />

      <h3>
        <QuestionCircleOutlined />
        &nbsp;
        <u>Help for Authors & Editors</u>
      </h3>
      {authorHelpData.map((helpSection) => {
        return (
          <>
            <center>
              <Collapse
                accordion
                bordered={true}
                size="large"
                style={{ borderColor: "darkgray", width: "75vw" }}
                items={[
                  {
                    key: helpSection.key,
                    label: <strong>{helpSection.title}</strong>,
                    children: (
                      <div>
                        <p>{helpSection.content}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </center>
          </>
        );
      })}

      <br />
      <Divider style={{ width: "75vw" }} />

      <h3>
        <QuestionCircleOutlined />
        &nbsp;
        <u>Help for Approvers</u>
      </h3>
      {approverHelpData.map((helpSection) => {
        return (
          <>
            <center>
              <Collapse
                accordion
                bordered={true}
                size="large"
                style={{ borderColor: "darkgray", width: "75vw" }}
                items={[
                  {
                    key: helpSection.key,
                    label: <strong>{helpSection.title}</strong>,
                    children: (
                      <div>
                        <p>{helpSection.content}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </center>
          </>
        );
      })}
    </>
  );
};
