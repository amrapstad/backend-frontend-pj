import * as React from 'react';
import { useState, useEffect } from 'react'
import { Form } from '@base-ui/react/form';
import { Button } from '@base-ui/react/button';
import Navbar from '../components/Tab';
import AddFormBoat from '../components/AddFormBoat';
import AddFormOwner from '../components/AddFormOwner';
import customStyles from '../css/other.module.css';
import selectStyles from '../css/select.module.css';
import CompCheckboxGroup from '../components/CheckboxGroup';

const styles = { ...selectStyles, ...customStyles };

export default function Add() {
    const [loading, setLoading] = React.useState(false);
    const [configurations, setConfigurations] = React.useState<string[]>([]);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setLoading(true);
        setErrors({});

        try {
            // Process Boat if not using existing
            if (!configurations.includes('boat_exists')) {
                const bRes = await fetch('/api/boats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        boatName: formData.get('boat_name'), 
                        modelYear: parseInt(formData.get('year_model') as string) || 0
                    })
                });
                if (!bRes.ok) throw new Error(await bRes.text() || 'Failed to create boat');
            }

            // Process Owner if not using existing
            if (!configurations.includes('owner_exists')) {
                const oRes = await fetch('/api/owners', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ownerName: formData.get('owner_name'),
                        email: formData.get('email')
                    })
                });
                if (!oRes.ok) throw new Error(await oRes.text() || 'Failed to create owner');
            }
            
            // Successfully processed both API requests.
            alert("Success!");
        } catch (err: any) {
            setErrors({ server: err.message || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1> Add </h1>
            <CompCheckboxGroup value={configurations} onValueChange={setConfigurations} />
            {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
            
            <Form onSubmit={handleSubmit} errors={errors}>
                <div className={styles.Form}>
                    <h3>Boat</h3>
                    <AddFormBoat isNew={configurations.includes('boat_exists')} />
                    <h3>Owner</h3>
                    <AddFormOwner isNew={configurations.includes('owner_exists')} />
                </div>
                <Button type="submit" disabled={loading} focusableWhenDisabled className={styles.Button_Custome}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </>
    )
}
