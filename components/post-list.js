import { useState } from 'react'
import { useQuery } from 'graphql-hooks'
import ErrorMessage from './error-message'
import PostUpvoter from './post-upvoter'
import Submit from './submit'

export const allPostsQuery = `
query listing($listingId: String! $withSemPhone: Boolean = false, $photoOrder: String) {
  listing(listingId: $listingId) {
    ... on Listing {
      address
      adminFee
      apartmentAmenities
      applicationFee
      applicationUrl
      availableLeaseTerms {
        id
        label
      }
      aggregates {
        totalAvailable
        prices {
          low
          high
          bedroomBreakdown {
            priceLow
            bedCount
            unitsAvailable
          }
        }
        beds {
          low
          high
        }
        baths {
          low
          high
        }
      }
      availableUnitCount
      avgOverallRating
      bedsCat
      catsAllowed
      categoryFeatures {
        code
        message
      }
      categoryRatings {
        avgRating
        category
      }
      city
      citySeoPath
      communityAmenities
      covidmsg
      desktopPhone(sem: $withSemPhone)
      disclaimer
      dogsAllowed
      geoCode
      hasHdTour
      hasHdVideo
      hasVideosOrTours
      hdTourUrl
      hdTourUrlMobile
      hdVideoUrl
      incomeRestrictions {
        maxAnnualIncome
        maxOccupants
      }
      isCorePaid
      isPhoneVisible
      isApartment
      isActive
      isBasic
      isCallTwentyFourSeven
      isCurrentFeatured
      isCurrentSpotlight
      lastUpdate
      latitude
      leadEmails
      leadPhoneRequired
      listingId
      listingBedLow
      listingBedHigh
      listingBathLow
      listingBathHigh
      listingDescription
      listingPriceLow
      listingPriceHigh
      listingSeoPath
      listingSourceId
      listingSqFtLow
      listingSqFtHigh
      longitude
      mgtcoId
      mgtcoLogo
      mgtCoName
      mgtCoDescription
      mPhone(sem: $withSemPhone)
      mustHaveAmenities
      nearbyListings
      neighborhoods
      numFloorplans
      numPhotos
      numRatings
      officeHours {
        day
        openTime
        closeTime
        comments
      }
      overallRatings {
        count1
        count2
        count3
        count4
        count5
      }
      parking {
        comment
        isAssigned
        perSpaceFee
        totalSpaces
        type
      }
      petPolicies {
        comment
        id
        label
        maximumPets
        weightRestriction
        initialFee
        additionalRent
        deposit
      }
      photoCount
      photos(limit: 10, photoOrder: $photoOrder) {
        path
        caption
      }
      propertyLabel
      propertyType
      propertyWebsite
      ptEmail
      recommendedListings
      selfGuidedTour
      tourPropertyId
      tourProvider
      tplSource
      revenue
      schools {
        attendanceZoneSchoolIds
        schoolsDisplay
      }
      sortSqFt
      sources
      sqFootCat
      specialTermsText
      state
      timeZoneId
      totalUnits
      unitSqFt
      videoCallTour
      videos {
        caption
        thumbnail
        url
      }
      zipCode
    }
  }
}
`


export const allPostsQueryOptions = (listingId) => ({
  variables: { listingId },
})

export default function PostList(props) {

  console.log('listingId: ', props.listingId)

  const { loading, error, data, refetch, cacheHit } = useQuery(
    allPostsQuery,
    {
      variables: { listingId: props.listingId }
    }
  )

    console.log('cacheHit: ', cacheHit)

  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>

  const { listing } = data

  return (
    <>
      <div onClick={ () => refetch({ variables: { skip: 0, first: allPosts.length } }) }>
        CLICK REFETCH
      </div>
      <div>{listing.name}</div>
    </>
  )
}
