export default function AdditionalInformationProduct() {
    return (
        <>
            <h2 className="text-xl font-semibold">Additional Information</h2>
            <div className="mt-2">
                <h3 className="font-bold">General</h3>
                <ul className="list-disc list-inside">
                    <li>Prices include taxes.</li>
                    <li>Tickets that have been purchased cannot be refunded.</li>
                    <li>Tickets that have been purchased cannot have their schedules changed.</li>
                    <li>Buyers are required to fill in personal data when ordering.</li>
                    <li>
                        Ticket sales may be stopped or started at any time by Eventify according to the policy of the
                        promoter or Eventify.
                    </li>
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="font-bold">E-ticket</h3>
                <ul className="list-disc list-inside">
                    <li>E-tickets cannot be exchanged for cash.</li>
                    <li>E-tickets can be combined with other promotions.</li>
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="font-bold">Attention</h3>
                <ul className="list-disc list-inside">
                    <li>
                        Official transactions with Eventify are only those conducted through the Eventify website and
                        application.
                    </li>
                    <li>
                        Eventify only acts as a ticket sales agent, so any issues arising in connection with the event
                        are the responsibility of the buyer and the event promoter.
                    </li>
                    <li>
                        Regarding the refund mechanism, it is entirely subject to the policies issued by the promoter.
                    </li>
                </ul>
            </div>
        </>
    );
}
