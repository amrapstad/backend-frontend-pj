'use client';
import * as React from 'react';
import { useState, useEffect } from 'react'
import { Form } from '@base-ui/react/form';
import { Button } from '@base-ui/react/button';
import { Field } from '@base-ui/react/field';
import styles from '../css/addform.module.css';
import fieldStyles from '../css/addform.module.css';
import submitButtonStyles from '../css/other.module.css';
import AddFormBoat from './AddFormBoat';
import AddFormOwner from './AddFormOwner';


export default function AddFormReciept() {
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setLoading(true);
        setErrors({});

        try {
            const rRes = await fetch('/api/receipts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    boatName: formData.get('boat_name'),
                    email: formData.get('email'),
                    purchaseDate: formData.get('purchase_date'),
                })
            });
            if (!rRes.ok) throw new Error(await rRes.text() || 'Failed to create receipt');

            alert("Success!");
        } catch (err: any) {
            setErrors({ server: err.message || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} errors={errors}>
                <div>
                    <h3>Reciept</h3>
                    <Field.Root name="purchase_date" className={fieldStyles.Field}>
                        <Field.Label className={fieldStyles.Label}>Purchase date</Field.Label>
                        <Field.Control
                            type="date"
                            required
                            defaultValue={Date.now().toString()}
                            placeholder={Date.now().toString()}
                            className={fieldStyles.Input}
                        />
                        <Field.Error className={fieldStyles.Error} />
                    </Field.Root>
                    <AddFormBoat isNew={false} />
                    <AddFormOwner isNew={false} />
                </div>
                <Button type="submit" disabled={loading} focusableWhenDisabled className={submitButtonStyles.Button_Custome}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </>
    );
}
