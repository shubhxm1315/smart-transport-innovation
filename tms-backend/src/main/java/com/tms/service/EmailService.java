package com.tms.service;

import com.tms.entity.Trip;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    @Async
    public void sendTripStatusUpdate(Trip trip, String oldStatus) {

        if (trip == null) {
            return;
        }

        log.info(
                "Trip {} status changed from {} to {}",
                trip.getId(),
                oldStatus,
                trip.getStatus()
        );
    }
}