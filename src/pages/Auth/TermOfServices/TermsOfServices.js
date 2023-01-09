import React, {useState} from 'react';
import {Button} from "@core/components";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import styled from "styled-components";
import {makeStyles} from "@material-ui/core";

const DialogActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const ContentContainer = styled.div`
  padding: 10px 30px 30px 30px;
`;

const Title = styled.p`
  font-size: 40px;
  line-height: 40px;
  font-family: "MADE Mirage Regular", serif;
`;

const Text = styled.p`
  margin-top: ${props => props.mt};
  font-size: ${props => props.fs};
  font-weight: ${props => props.fw};
`;

const TextTitle = styled(Text)`
  margin-top: ${props => props.mt};
  font-size: ${props => props.fs || '20px'};
  font-weight: ${props => props.fw || '700'};
  font-family: 'Raleway', sans-serif;
`;

const List = styled.ul`
  list-style: initial;
  margin-top: ${props => props.mt};
  padding-left: 35px;

  li::marker {
    font-size: 9px;
  }
`;

const ListItem = styled.li`
  margin-top: ${props => props.mt};
`;

const useStyles = makeStyles(() => ({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    content: {
        marginTop: '20px',
        width: '100%',
        fontSize: '14px',
        textAlign: 'justify',
    },
    paper: {
        maxWidth: '750px',
        maxHeight: '760px',
    },
}));

const TermsOfServices = ({open, handleClose, handleClick}) => {
    const classes = useStyles();

    const [bottom, setBottom] = useState(true);

    const handleScroll = (e) => {
        const read = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setBottom(!read);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="termsOfServices-dialog-title"
            aria-describedby="termsOfServices-dialog-description"
            classes={{paper: classes.paper}}
        >
            <ContentContainer onScroll={handleScroll} style={{overflow: 'auto'}}>
                <DialogContent className={classes.dialogContent}>
                    <Title>
                        Lucia Terms of Services
                    </Title>
                    <DialogContentText className={classes.content} id="termsOfServices-dialog-description">
                        <TextTitle mt="20px">Privacy Policy</TextTitle>
                        <Text mt="30px">Last updated: October 06, 2021</Text>
                        <Text mt="20px">
                            This Privacy Policy describes Our policies and procedures on the collection, use and
                            disclosure
                            of Your information when You use the Service and tells You about Your privacy rights and how
                            the
                            law protects You.
                        </Text>
                        <Text>
                            We use Your Personal data to provide and improve the Service. By using the Service, You
                            agree to
                            the collection and use of information in accordance with this Privacy Policy. This Privacy
                            Policy has been created with the help of the Privacy Policy Generator.
                        </Text>

                        <TextTitle mt="20px">Interpretation and Definitions</TextTitle>
                        <TextTitle mt="20px" fs="16px">Interpretation</TextTitle>
                        <Text mt="10px">
                            The words of which the initial letter is capitalized have meanings defined under the
                            following
                            conditions. The following definitions shall have the same meaning regardless of whether they
                            appear in singular or in plural.
                        </Text>
                        <TextTitle mt="20px" fs="16px">Definitions</TextTitle>

                        <TextTitle mt="20px" fs="16px">For the purposes of this Privacy Policy:</TextTitle>

                        <List mt="10px">
                            <ListItem>
                                <b>Account</b> means a unique account created for You to access our Service or parts of
                                our Service.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Affiliate</b> means an entity that controls, is controlled by or is under common
                                control with a
                                party, where "control" means ownership of 50% or more of the shares, equity interest or
                                other
                                securities entitled to vote for election of directors or other managing authority.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Application</b> means the software program provided by the Company downloaded by You
                                on any
                                electronic device, named Lucia
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Company</b> (referred to as either "the Company", "We", "Us" or "Our" in this
                                Agreement) refers to
                                My Tripkit LLC, 58 arbor field way, lake grove, ny 11755 US.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Cookies</b> are small files that are placed on Your computer, mobile device or any
                                other device by a
                                website, containing the details of Your browsing history on that website among its many
                                uses.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Country</b> refers to: New York, United States
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Device</b> means any device that can access the Service such as a computer, a
                                cellphone or a digital
                                tablet.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Personal</b> Data is any information that relates to an identified or identifiable
                                individual.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Service</b> refers to the Application or the Website or both.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Service Provider</b> means any natural or legal person who processes the data on
                                behalf of the
                                Company. It refers to third-party companies or individuals employed by the Company to
                                facilitate
                                the Service, to provide the Service on behalf of the Company, to perform services
                                related to the
                                Service or to assist the Company in analyzing how the Service is used.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Usage Data</b> refers to data collected automatically, either generated by the use of
                                the Service or
                                from the Service infrastructure itself (for example, the duration of a page visit).
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Website</b> refers to Lucia, accessible from <a
                                href="https://www.letslucia.com/">www.letslucia.com</a>
                            </ListItem>
                            <ListItem mt="15px">
                                <b>You</b> means the individual accessing or using the Service, or the company, or other
                                legal entity
                                on behalf of which such individual is accessing or using the Service, as applicable.
                            </ListItem>
                        </List>

                        <TextTitle mt="20px">Collecting and Using Your Personal Data</TextTitle>

                        <TextTitle mt="20px" fs="16px">Types of Data Collected</TextTitle>

                        <TextTitle mt="15px" fs="14px">Personal Data</TextTitle>
                        <Text mt="10px">
                            While using Our Service, We may ask You to provide Us with certain personally identifiable
                            information that can be used to contact or identify You. Personally identifiable information
                            may
                            include, but is not limited to:
                        </Text>
                        <List mt="10px">
                            <ListItem>
                                Email address
                            </ListItem>
                            <ListItem mt="15px">
                                First name and last name
                            </ListItem>
                            <ListItem mt="15px">
                                Phone number
                            </ListItem>
                            <ListItem mt="15px">
                                Address, State, Province, ZIP/Postal code, City
                            </ListItem>
                            <ListItem mt="15px">
                                Usage Data
                            </ListItem>
                        </List>

                        <TextTitle mt="15px" fs="14px">Usage Data</TextTitle>
                        <Text mt="10px">
                            Usage Data is collected automatically when using the Service.
                        </Text>

                        <Text mt="10px">
                            Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP
                            address), browser type, browser version, the pages of our Service that You visit, the time
                            and
                            date of Your visit, the time spent on those pages, unique device identifiers and other
                            diagnostic data.
                        </Text>

                        <Text mt="10px">
                            When You access the Service by or through a mobile device, We may collect certain
                            information
                            automatically, including, but not limited to, the type of mobile device You use, Your mobile
                            device unique ID, the IP address of Your mobile device, Your mobile operating system, the
                            type
                            of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                        </Text>

                        <Text mt="10px">
                            We may also collect information that Your browser sends whenever You visit our Service or
                            when
                            You access the Service by or through a mobile device.
                        </Text>

                        <TextTitle mt="15px" fs="14px">Tracking Technologies and Cookies</TextTitle>
                        <Text mt="10px">
                            We use Cookies and similar tracking technologies to track the activity on Our Service and
                            store
                            certain information. Tracking technologies used are beacons, tags, and scripts to collect
                            and
                            track information and to improve and analyze Our Service. The technologies We use may
                            include:
                        </Text>
                        <List mt="10px">
                            <ListItem>
                                <b>Cookies or Browser Cookies.</b> A cookie is a small file placed on Your Device. You
                                can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being
                                sent. However, if You do not accept Cookies, You may not be able to use some parts of
                                our Service. Unless you have adjusted Your browser setting so that it will refuse
                                Cookies, our Service may use Cookies.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Flash Cookies.</b> Certain features of our Service may use local stored objects (or
                                Flash Cookies)
                                to collect and store information about Your preferences or Your activity on our Service.
                                Flash
                                Cookies are not managed by the same browser settings as those used for Browser Cookies.
                                For more
                                information on how You can delete Flash Cookies, please read "Where can I change the
                                settings
                                for disabling, or deleting local shared objects?" available at
                                <a href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_
                        change_the_settings_for_disabling__or_deleting_local_shared_objects_"> https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_
                                    change_the_settings_for_disabling__or_deleting_local_shared_objects_
                                </a>
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Web Beacons.</b> Certain sections of our Service and our emails may contain small
                                electronic files
                                known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs)
                                that
                                permit the Company, for example, to count users who have visited those pages or opened
                                an email
                                and for other related website statistics (for example, recording the popularity of a
                                certain
                                section and verifying system and server integrity).
                            </ListItem>
                            <ListItem mt="15px">
                                Address, State, Province, ZIP/Postal code, City
                            </ListItem>
                            <ListItem mt="15px">
                                Usage Data
                            </ListItem>
                        </List>
                        <Text mt="10px">
                            Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal
                            computer or mobile device when You go offline, while Session Cookies are deleted as soon as
                            You
                            close Your web browser. You can learn more about cookies here: <a
                            href="https://www.termsfeed.com/blog/cookies/">All About Cookies by TermsFeed.</a>
                        </Text>
                        <Text mt="10px">
                            We use both Session and Persistent Cookies for the purposes set out below:
                        </Text>
                        <List mt="10px">
                            <ListItem>
                                <b>Necessary / Essential Cookies</b>

                                <Text mt="10px">
                                    Type: Session Cookies
                                </Text>
                                <Text mt="10px">
                                    Administered by: Us
                                </Text>
                                <Text mt="10px">
                                    Purpose: These Cookies are essential to provide You with services available through
                                    the Website and to enable You to use some of its features. They help to authenticate
                                    users and prevent fraudulent use of user accounts. Without these Cookies, the
                                    services that You have asked for cannot be provided, and We only use these Cookies
                                    to provide You with those services.
                                </Text>
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Cookies Policy / Notice Acceptance Cookies</b>

                                <Text mt="10px">
                                    Type: Persistent Cookies
                                </Text>
                                <Text mt="10px">
                                    Administered by: Us
                                </Text>
                                <Text mt="10px">
                                    Purpose: These Cookies identify if users have accepted the use of cookies on the
                                    Website.
                                </Text>
                            </ListItem>
                            <ListItem mt="15px">
                                <b>Functionality Cookies</b>

                                <Text mt="10px">
                                    Type: Persistent Cookies
                                </Text>
                                <Text mt="10px">
                                    Administered by: Us
                                </Text>
                                <Text mt="10px">
                                    Purpose: These Cookies allow us to remember choices You make when You use the
                                    Website, such as remembering your login details or language preference. The purpose
                                    of these Cookies is to provide You with a more personal experience and to avoid You
                                    having to re-enter your preferences every time You use the Website.
                                </Text>
                            </ListItem>
                        </List>

                        <Text mt="10px">
                            For more information about the cookies we use and your choices regarding cookies, please
                            visit our Cookies Policy or the Cookies section of our Privacy Policy.
                        </Text>

                        <TextTitle mt="20px" fs="16px">Use of Your Personal Data</TextTitle>

                        <Text mt="10px">
                            The Company may use Personal Data for the following purposes:
                        </Text>
                        <List mt="10px">
                            <ListItem>
                                <b>To provide and maintain our Service, </b>including to monitor the usage of our Service.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>To manage Your Account: </b>to manage Your registration as a user of the Service. The Personal Data
                                You provide can give You access to different functionalities of the Service that are available
                                to You as a registered user.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>For the performance of a contract: </b>the development, compliance and undertaking of the purchase
                                contract for the products, items or services You have purchased or of any other contract with Us
                                through the Service.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>To contact You: </b>To contact You by email, telephone calls, SMS, or other equivalent forms of
                                electronic communication, such as a mobile application's push notifications regarding updates or
                                informative communications related to the functionalities, products or contracted services,
                                including the security updates, when necessary or reasonable for their implementation.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>To provide You </b>with news, special offers and general information about other goods, services and
                                events which we offer that are similar to those that you have already purchased or enquired
                                about unless You have opted not to receive such information.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>To manage Your requests: </b>To attend and manage Your requests to Us.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>For business transfers: </b>We may use Your information to evaluate or conduct a merger,
                                divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or
                                all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar
                                proceeding, in which Personal Data held by Us about our Service users is among the assets
                                transferred.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>For other purposes: </b>We may use Your information for other purposes, such as data analysis,
                                identifying usage trends, determining the effectiveness of our promotional campaigns and to
                                evaluate and improve our Service, products, services, marketing and your experience.
                            </ListItem>
                        </List>

                        <Text mt="10px">
                            We may share Your personal information in the following situations:
                        </Text>
                        <List mt="10px">
                            <ListItem>
                                <b>With Service Providers: </b>We may share Your personal information with Service Providers to monitor
                                and analyze the use of our Service, to contact You.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>For business transfers: </b>We may share or transfer Your personal information in connection with,
                                or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all
                                or a portion of Our business to another company.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>With Affiliates: </b>We may share Your information with Our affiliates, in which case we will
                                require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and
                                any other subsidiaries, joint venture partners or other companies that We control or that are
                                under common control with Us.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>With business partners: </b>We may share Your information with Our business partners to offer You
                                certain products, services or promotions.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>With other users: </b>when You share personal information or otherwise interact in the public areas
                                with other users, such information may be viewed by all users and may be publicly distributed
                                outside.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>To manage Your requests: </b>To attend and manage Your requests to Us.
                            </ListItem>
                            <ListItem mt="15px">
                                <b>With Your consent: </b> We may disclose Your personal information for any other purpose with Your
                                consent.
                            </ListItem>
                        </List>

                        <TextTitle mt="20px" fs="16px">Retention of Your Personal Data</TextTitle>
                        <Text mt="10px">
                            The Company will retain Your Personal Data only for as long as is necessary for the purposes set
                            out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to
                            comply with our legal obligations (for example, if we are required to retain your data to comply
                            with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                        </Text>

                        <Text mt="10px">
                            The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally
                            retained for a shorter period of time, except when this data is used to strengthen the security
                            or to improve the functionality of Our Service, or We are legally obligated to retain this data
                            for longer time periods.
                        </Text>

                        <TextTitle mt="20px" fs="16px">Transfer of Your Personal Data</TextTitle>
                        <Text mt="10px">
                            Your information, including Personal Data, is processed at the Company's operating offices and
                            in any other places where the parties involved in the processing are located. It means that this
                            information may be transferred to — and maintained on — computers located outside of Your state,
                            province, country or other governmental jurisdiction where the data protection laws may differ
                            than those from Your jurisdiction.
                        </Text>

                        <Text mt="10px">
                            Your consent to this Privacy Policy followed by Your submission of such information represents
                            Your agreement to that transfer.
                        </Text>

                        <Text mt="10px">
                            The Company will take all steps reasonably necessary to ensure that Your data is treated
                            securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will
                            take place to an organization or a country unless there are adequate controls in place including
                            the security of Your data and other personal information.
                        </Text>

                        <TextTitle mt="20px" fs="16px">Disclosure of Your Personal Data</TextTitle>

                        <TextTitle mt="20px" fs="14px">Business Transactions</TextTitle>
                        <Text mt="10px">
                            If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be
                            transferred. We will provide notice before Your Personal Data is transferred and becomes subject
                            to a different Privacy Policy.
                        </Text>

                        <TextTitle mt="20px" fs="14px">Law enforcement</TextTitle>
                        <Text mt="10px">
                            Under certain circumstances, the Company may be required to disclose Your Personal Data if
                            required to do so by law or in response to valid requests by public authorities (e.g. a court or
                            a government agency).
                        </Text>

                        <TextTitle mt="20px" fs="14px">Other legal requirements</TextTitle>
                        <Text mt="10px">
                            The Company may disclose Your Personal Data in the good faith belief that such action is
                            necessary to:
                        </Text>
                        <List mt="10px">
                            <ListItem>
                                Comply with a legal obligation
                            </ListItem>
                            <ListItem mt="15px">
                                Protect and defend the rights or property of the Company
                            </ListItem>
                            <ListItem mt="15px">
                                Prevent or investigate possible wrongdoing in connection with the Service
                            </ListItem>
                            <ListItem mt="15px">
                                Protect the personal safety of Users of the Service or the public
                            </ListItem>
                            <ListItem mt="15px">
                                Protect against legal liability
                            </ListItem>
                        </List>

                        <TextTitle mt="20px" fs="16px">Security of Your Personal Data</TextTitle>
                        <Text mt="10px">
                            The security of Your Personal Data is important to Us, but remember that no method of
                            transmission over the Internet, or method of electronic storage is 100% secure. While We strive
                            to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its
                            absolute security.
                        </Text>

                        <TextTitle mt="20px">Children's Privacy</TextTitle>
                        <Text mt="10px">
                            Our Service does not address anyone under the age of 13. We do not knowingly collect personally
                            identifiable information from anyone under the age of 13. If You are a parent or guardian and
                            You are aware that Your child has provided Us with Personal Data, please contact Us. If We
                            become aware that We have collected Personal Data from anyone under the age of 13 without
                            verification of parental consent, We take steps to remove that information from Our servers.
                        </Text>

                        <Text mt="10px">
                            If We need to rely on consent as a legal basis for processing Your information and Your country
                            requires consent from a parent, We may require Your parent's consent before We collect and use
                            that information.
                        </Text>

                        <TextTitle mt="20px">Links to Other Websites</TextTitle>
                        <Text mt="10px">
                            Our Service may contain links to other websites that are not operated by Us. If You click on a
                            third party link, You will be directed to that third party's site. We strongly advise You to
                            review the Privacy Policy of every site You visit.
                        </Text>

                        <Text mt="10px">
                            We have no control over and assume no responsibility for the content, privacy policies or
                            practices of any third party sites or services.
                        </Text>

                        <TextTitle mt="20px">Changes to this Privacy Policy</TextTitle>
                        <Text mt="10px">
                            We may update Our Privacy Policy from time to time. We will notify You of any changes by posting
                            the new Privacy Policy on this page.
                        </Text>

                        <Text mt="10px">
                            We will let You know via email and/or a prominent notice on Our Service, prior to the change
                            becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                        </Text>

                        <Text mt="10px">
                            You are advised to review this Privacy Policy periodically for any changes. Changes to this
                            Privacy Policy are effective when they are posted on this page.
                        </Text>

                        <TextTitle mt="20px">Contact Us</TextTitle>
                        <Text mt="10px">
                            If you have any questions about this Privacy Policy, You can contact us:
                        </Text>
                        <List mt="10px">
                            <ListItem>
                                By email: <a href = "mailto: hello@letslucia.com">hello@letslucia.com</a>
                            </ListItem>
                        </List>
                    </DialogContentText>
                </DialogContent>
            </ContentContainer>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    $outlined
                    $width="50%"
                >
                    Decline
                </Button>
                <Button
                    onClick={handleClick}
                    $primary
                    $width="50%"
                    // disabled={bottom}
                >
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TermsOfServices;