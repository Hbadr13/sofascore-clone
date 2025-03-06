'use client'
import { Sheet } from 'react-modal-sheet';
import { useState } from 'react';

const Example = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)}>Open sheet</button>

            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    );
}

export default Example